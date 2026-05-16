require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const pool = require('./db');

const authRoutes = require('./routes/auth');
const feedbackRoutes = require('./routes/feedback');
const usersRoutes = require('./routes/users');

const app = express();
const PORT = parseInt(process.env.PORT || '4000', 10);

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => {
    res.json({ ok: true, time: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/users', usersRoutes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

// При старте проверим, нужно ли поставить реальные хеши паролей для admin/user
async function ensureDefaultPasswords() {
    try {
        const r = await pool.query("SELECT id, username, password_hash FROM users WHERE username IN ('admin','user')");
        for (const row of r.rows) {
            if (row.password_hash === 'TO_BE_REPLACED') {
                const plain = row.username; // admin -> admin, user -> user
                const hash = await bcrypt.hash(plain, 10);
                await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hash, row.id]);
                console.log('Установлен пароль по умолчанию для пользователя:', row.username);
            }
        }
    } catch (e) {
        console.warn('Не удалось проверить пароли по умолчанию (возможно, не создана БД):', e.message);
    }
}

app.listen(PORT, async () => {
    console.log('Backend запущен на порту', PORT);
    await ensureDefaultPasswords();
});
