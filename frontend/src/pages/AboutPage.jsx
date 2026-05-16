import React from 'react';
import { Box, Typography, Paper, Stack, Chip } from '@mui/material';

// ЛР 7: страница "О себе" - отдельная страница.
export default function AboutPage() {
    const stack = [
        'React 18',
        'Vite',
        'Redux Toolkit',
        'RTK Query',
        'React Router 6',
        'MUI 5',
        'react-hook-form',
        '@tanstack/react-table',
        '@dnd-kit',
        'Vitest',
        'Node.js + Express',
        'PostgreSQL',
    ];

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                О проекте
            </Typography>
            <Paper sx={{ p: 3, mb: 2 }}>
                <Typography variant="body1" paragraph>
                    Это учебный проект, объединяющий лабораторные работы 2-9. Каждая лабораторная работа
                    реализована в виде отдельной страницы или раздела, но все они образуют единое приложение.
                </Typography>
                <Typography variant="body1" paragraph>
                    Backend написан на Node.js + Express и общается с PostgreSQL через библиотеку pg.
                    Frontend - на React с использованием Vite, Redux Toolkit (включая RTK Query), MUI и
                    react-hook-form. Авторизация реализована на JWT-токенах.
                </Typography>
                <Typography variant="body1" paragraph>
                    Для запуска проекта на Windows 11 нужны Node.js 18+ и PostgreSQL 14+.
                    Подробнее в файле README.md.
                </Typography>
            </Paper>

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Используемые технологии
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {stack.map((t) => (
                        <Chip key={t} label={t} variant="outlined" />
                    ))}
                </Stack>
            </Paper>
        </Box>
    );
}
