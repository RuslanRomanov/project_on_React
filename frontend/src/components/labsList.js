// Описания лабораторных работ. Используются в меню (ЛР 3) и на страницах ЛР.
const labs = [
    {
        id: 2,
        path: '/lab/2',
        title: 'ЛР 2: Hello World и компоненты',
        description:
            'Создан "Hello World" на React + Vite. Реализованы компоненты Button и Container, шаблон страницы с навигацией (Header + Menu + Footer).',
    },
    {
        id: 3,
        path: '/lab/3',
        title: 'ЛР 3: Header, Footer, Menu, Content',
        description:
            'Шаблон страницы с компонентами Header, Footer, Menu и Content. В меню выводится список лабораторных, в Content - содержимое выбранной лабораторной.',
    },
    {
        id: 4,
        path: '/lab/4',
        title: 'ЛР 4: Context, useState/useEffect, Router, Redux',
        description:
            'Переключение темы (день/ночь) через Context. Простые примеры useState и useEffect (монтирование/размонтирование). React Router для переходов. Redux со счётчиком (increment / decrement).',
    },
    {
        id: 5,
        path: '/lab/5',
        title: 'ЛР 5: Формы и обратная связь',
        description:
            'Формы регистрации и авторизации с валидацией (react-hook-form). Блок обратной связи: форма и список отзывов. Обработка submit через useCallback. Кастомный хук useLoginState. Профиль пользователя с кнопкой выхода.',
    },
    {
        id: 6,
        path: '/lab/6',
        title: 'ЛР 6: REST-сервер и запросы',
        description:
            'REST-сервер на Node.js + PostgreSQL. GET, POST, PUT, DELETE запросы через axios и fetch. Редактирование профиля. Список отзывов (GET) с возможностью удаления. Оптимизация через Redux.',
    },
    {
        id: 7,
        path: '/lab/7',
        title: 'ЛР 7: MUI и адаптив',
        description:
            'UI Kit MUI. Отдельные страницы "Главная" и "О себе". Переключение темы в Header. Профиль пользователя в стандарте MUI. Меню в виде Drawer вызывается из Header. Нижнее меню быстрых действий. Приложение адаптивно.',
    },
    {
        id: 8,
        path: '/lab/8',
        title: 'ЛР 8: Таблицы и админ-блок',
        description:
            '@tanstack/react-table. Роли admin/user. Админ-блок: список пользователей, действия (заблокировать/удалить), управление обратной связью. Для обычного пользователя обратная связь - только на чтение. Сортировка и перетаскивание колонок (drag-and-drop).',
    },
    {
        id: 9,
        path: '/lab/9',
        title: 'ЛР 9: Тесты, RTK Query, Lazy',
        description:
            'Тест компонента Button (Vitest + Testing Library). Рефакторинг страницы списка данных на useGetFeedbackQuery (RTK Query) с isLoading / isError / isFetching. Lazy-импорт страниц лабораторных (code splitting).',
    },
];

export default labs;
