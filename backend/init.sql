-- Схема базы данных для проекта лабораторных работ 2-9

DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(64) UNIQUE NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(128) DEFAULT '',
    role VARCHAR(16) NOT NULL DEFAULT 'user',
    is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    author_name VARCHAR(128) NOT NULL,
    message TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    is_blocked BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Тестовые пользователи. Пароли admin / user
-- Хэши получены через bcryptjs с salt rounds = 10
-- admin:admin -> $2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
-- user:user   -> $2a$10$3iJqWzZcQz4U7g4iE7VfYO8DhSXl0J2k3kE9oM6r9YQ7r5pV8YN6e
-- Реальные значения генерируются при первом запуске сервера, если таблица users пуста.

INSERT INTO users (username, email, password_hash, full_name, role) VALUES
    ('admin', 'admin@example.com', 'TO_BE_REPLACED', 'Администратор системы', 'admin'),
    ('user',  'user@example.com',  'TO_BE_REPLACED', 'Обычный пользователь',  'user');

INSERT INTO feedback (user_id, author_name, message, rating) VALUES
    (2, 'Обычный пользователь', 'Очень удобное приложение, спасибо разработчикам.', 5),
    (2, 'Обычный пользователь', 'Не хватает экспорта данных в Excel.', 4),
    (NULL, 'Гость', 'Тёмная тема приятна для глаз.', 5);
