const express = require('express');
const pool = require('../db');
const { authRequired, adminRequired } = require('../middleware/auth');

const router = express.Router();

// GET /api/users - список пользователей (только админ)
router.get('/', authRequired, adminRequired, async (req, res) => {
    try {
        const r = await pool.query(
            `SELECT id, username, email, full_name, role, is_blocked, created_at
             FROM users ORDER BY created_at DESC`
        );
        res.json(r.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Не удалось получить список пользователей' });
    }
});

// PUT /api/users/:id/block
router.put('/:id/block', authRequired, adminRequired, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { isBlocked } = req.body || {};
    if (id === req.user.id) {
        return res.status(400).json({ error: 'Нельзя заблокировать самого себя' });
    }
    try {
        const r = await pool.query(
            `UPDATE users SET is_blocked = $1 WHERE id = $2
             RETURNING id, username, email, full_name, role, is_blocked, created_at`,
            [!!isBlocked, id]
        );
        if (r.rowCount === 0) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.json(r.rows[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Не удалось обновить пользователя' });
    }
});

// DELETE /api/users/:id
router.delete('/:id', authRequired, adminRequired, async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (id === req.user.id) {
        return res.status(400).json({ error: 'Нельзя удалить самого себя' });
    }
    try {
        const r = await pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
        if (r.rowCount === 0) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        res.json({ ok: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Не удалось удалить пользователя' });
    }
});

module.exports = router;
