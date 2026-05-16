const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');
const { authRequired, signToken } = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
    const { username, email, password, fullName } = req.body || {};
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Не заполнены обязательные поля' });
    }
    if (password.length < 4) {
        return res.status(400).json({ error: 'Пароль должен быть не короче 4 символов' });
    }
    try {
        const existing = await pool.query(
            'SELECT id FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );
        if (existing.rowCount > 0) {
            return res.status(409).json({ error: 'Пользователь с таким логином или email уже существует' });
        }
        const hash = await bcrypt.hash(password, 10);
        const insert = await pool.query(
            `INSERT INTO users (username, email, password_hash, full_name, role)
             VALUES ($1, $2, $3, $4, 'user')
             RETURNING id, username, email, full_name, role`,
            [username, email, hash, fullName || '']
        );
        const user = insert.rows[0];
        const token = signToken(user);
        res.json({ token, user: { id: user.id, username: user.username, email: user.email, fullName: user.full_name, role: user.role } });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Ошибка сервера при регистрации' });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { username, password } = req.body || {};
    if (!username || !password) {
        return res.status(400).json({ error: 'Не заполнены обязательные поля' });
    }
    try {
        const found = await pool.query(
            'SELECT id, username, email, full_name, role, is_blocked, password_hash FROM users WHERE username = $1',
            [username]
        );
        if (found.rowCount === 0) {
            return res.status(401).json({ error: 'Неверный логин или пароль' });
        }
        const u = found.rows[0];
        if (u.is_blocked) {
            return res.status(403).json({ error: 'Пользователь заблокирован' });
        }
        const ok = await bcrypt.compare(password, u.password_hash);
        if (!ok) {
            return res.status(401).json({ error: 'Неверный логин или пароль' });
        }
        const token = signToken(u);
        res.json({
            token,
            user: { id: u.id, username: u.username, email: u.email, fullName: u.full_name, role: u.role },
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Ошибка сервера при входе' });
    }
});

// GET /api/auth/me
router.get('/me', authRequired, async (req, res) => {
    try {
        const r = await pool.query(
            'SELECT id, username, email, full_name, role FROM users WHERE id = $1',
            [req.user.id]
        );
        if (r.rowCount === 0) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }
        const u = r.rows[0];
        res.json({ id: u.id, username: u.username, email: u.email, fullName: u.full_name, role: u.role });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// PUT /api/auth/me  - редактирование собственного профиля
router.put('/me', authRequired, async (req, res) => {
    const { email, fullName } = req.body || {};
    try {
        const r = await pool.query(
            `UPDATE users SET email = COALESCE($1, email), full_name = COALESCE($2, full_name)
             WHERE id = $3
             RETURNING id, username, email, full_name, role`,
            [email || null, fullName || null, req.user.id]
        );
        const u = r.rows[0];
        res.json({ id: u.id, username: u.username, email: u.email, fullName: u.full_name, role: u.role });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Не удалось обновить профиль' });
    }
});

module.exports = router;
