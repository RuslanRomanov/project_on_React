# Проект "Лабораторные работы 2-9"

Учебный проект, объединяющий лабораторные работы 2-9.

## Стек технологий

- Frontend: React 18 + Vite + Redux Toolkit (RTK Query) + React Router + MUI + react-hook-form + @tanstack/react-table
- Backend: Node.js + Express
- База данных: PostgreSQL
- Тесты: Vitest + React Testing Library

## Структура

```
project2-9/
  backend/    - Node.js API + PostgreSQL
  frontend/   - React + Vite
```

## Подготовка окружения (Windows 11)

1. Установить Node.js 18+ (https://nodejs.org)
2. Установить PostgreSQL 14+ (https://www.postgresql.org/download/windows)
3. В PostgreSQL создать базу данных и применить схему:

```
psql -U postgres -c "CREATE DATABASE lab_project;"
psql -U postgres -d lab_project -f backend/init.sql
```

## Запуск backend

```
cd backend
copy .env.example .env
notepad .env          (указать пароль PostgreSQL в DB_PASSWORD)
npm install
npm start
```

Backend запустится на http://localhost:4000

## Запуск frontend

В отдельном окне терминала:

```
cd frontend
npm install
npm run dev
```

Frontend запустится на http://localhost:5173

## Учётные записи по умолчанию (после применения init.sql)

- admin / admin    (роль admin)
- user  / user     (роль user)

## Соответствие лабораторных работ

- ЛР 2: компоненты Button, Container, шаблон страницы с навигацией (frontend/src/components/Button.jsx, Container.jsx, Layout.jsx)
- ЛР 3: Header, Footer, Menu, Content; меню с лабораторными (frontend/src/components/Header.jsx, Footer.jsx, Menu.jsx)
- ЛР 4: ThemeContext (день/ночь), useState/useEffect, React Router, Redux со счётчиком
- ЛР 5: формы регистрации/авторизации с валидацией, обратная связь, useLoginState, профиль с выходом
- ЛР 6: REST API на Node.js + PostgreSQL, fetch/axios, редактирование профиля, удаление отзывов
- ЛР 7: MUI, Header (Главная, О себе), Drawer-меню, нижнее меню быстрых действий, адаптивность
- ЛР 8: @tanstack/react-table, роли admin/user, админ-панель, сортировка и перетаскивание колонок
- ЛР 9: тест Button, рефакторинг на RTK Query (useGetFeedbackQuery), isLoading/isError/isFetching, lazy импорты

## Тесты frontend

```
cd frontend
npm test
```

## Скрипты npm

Backend:
- npm start            запуск сервера
- npm run dev          запуск с автоперезагрузкой (nodemon)

Frontend:
- npm run dev          dev-сервер Vite
- npm run build        production-сборка
- npm test             тесты Vitest
