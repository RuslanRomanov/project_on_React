const express = require('express');
const pool = require('../db');
const { authRequired, adminRequired } = require('../middleware/auth');

const router = express.Router();

// GET /api/feedback - получить список отзывов (только не заблокированные для обычных)
router.get('/', async (req, res) => {
    try {
        // Если запрос пришёл от админа - показать всё, иначе только не заблокированные
        let showAll = false;
        const header = req.headers.authorization || '';
        if (header.startsWith('Bearer ')) {
            try {
                const jwt = require('jsonwebtoken');
                const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET || 'dev_secret');
                if (payload.role === 'admin') showAll = true;
            } catch (e) {
                // игнорируем - покажем как для гостя
            }
        }
        const q = showAll
            ? 'SELECT id, user_id, author_name, message, rating, is_blocked, created_at FROM feedback ORDER BY created_at DESC'
            : 'SELECT id, user_id, author_name, message, rating, is_blocked, created_at FROM feedback WHERE is_blocked = FALSE ORDER BY created_at DESC';
        const r = await pool.query(q);
        res.json(r.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Не удалось получить список отзывов' });
    }
});

// POST /api/feedback - оставить отзыв
router.post('/', async (req, res) => {
    const { authorName, message, rating } = req.body || {};
    if (!authorName || !message) {
        return res.status(400).json({ error: 'Заполните имя и сообщение' });
    }
    if (message.length < 3) {
        return res.status(400).json({ error: 'Сообщение слишком короткое' });
    }
    try {
        // Получим userId, если есть авторизация
        let userId = null;
        const header = req.headers.authorization || '';
        if (header.startsWith('Bearer ')) {
            try {
                const jwt = require('jsonwebtoken');
                const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET || 'dev_secret');
                userId = payload.id;
            } catch (e) {
                // отзыв оставляется как гостем
            }
        }
        const r = await pool.query(
            `INSERT INTO feedback (user_id, author_name, message, rating)
             VALUES ($1, $2, $3, $4)
             RETURNING id, user_id, author_name, message, rating, is_blocked, created_at`,
            [userId, authorName, message, Math.max(1, Math.min(5, parseInt(rating || 5, 10)))]
        );
        res.status(201).json(r.rows[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Не удалось сохранить отзыв' });
    }
});

// DELETE /api/feedback/:id - удалить (админ или автор)
router.delete('/:id', authRequired, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const found = await pool.query('SELECT user_id FROM feedback WHERE id = $1', [id]);
        if (found.rowCount === 0) {
            return res.status(404).json({ error: 'Отзыв не найден' });
        }
        const isAuthor = found.rows[0].user_id === req.user.id;
        const isAdmin = req.user.role === 'admin';
        if (!isAuthor && !isAdmin) {
            return res.status(403).json({ error: 'Нет прав на удаление' });
        }
        await pool.query('DELETE FROM feedback WHERE id = $1', [id]);
        res.json({ ok: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Не удалось удалить отзыв' });
    }
});

// PUT /api/feedback/:id/block - заблокировать/разблокировать (только админ)
router.put('/:id/block', authRequired, adminRequired, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { isBlocked } = req.body || {};
    try {
        const r = await pool.query(
            `UPDATE feedback SET is_blocked = $1 WHERE id = $2
             RETURNING id, user_id, author_name, message, rating, is_blocked, created_at`,
            [!!isBlocked, id]
        );
        if (r.rowCount === 0) {
            return res.status(404).json({ error: 'Отзыв не найден' });
        }
        res.json(r.rows[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Не удалось обновить статус' });
    }
});

module.exports = router;
