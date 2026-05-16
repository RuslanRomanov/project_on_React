import React, { useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Alert, Box, CircularProgress } from '@mui/material';
import LabPage from '../components/LabPage';
import Container from '../components/Container';
import Button from '../components/Button';
import labs from '../components/labsList';

// ЛР 6: демонстрация запросов GET через fetch напрямую (рядом со страницей обратной связи на axios).
export default function Lab6Page() {
    const lab = labs.find((l) => l.id === 6);
    const [health, setHealth] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const checkServer = async () => {
        setLoading(true);
        setError('');
        try {
            const r = await fetch('/api/health');
            if (!r.ok) throw new Error('HTTP ' + r.status);
            setHealth(await r.json());
        } catch (e) {
            setError('Сервер недоступен. Убедитесь, что backend запущен на порту 4000.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkServer();
    }, []);

    return (
        <LabPage id={6} title={lab.title} description={lab.description}>
            <Container title="Реализовано в ЛР 6">
                <List dense>
                    <ListItem>
                        <ListItemText
                            primary="REST-сервер на Node.js + Express + PostgreSQL"
                            secondary="Папка backend/, см. server.js, db.js, routes/."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="GET, POST, PUT, DELETE запросы"
                            secondary="GET /api/feedback, POST /api/feedback, DELETE /api/feedback/:id, PUT /api/auth/me и т.д."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Промисы через fetch и axios"
                            secondary="axios используется на странице обратной связи и в формах. fetch - на этой странице."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Формы авторизации / регистрации / обратной связи отправляются на сервер"
                            secondary="POST /api/auth/login, POST /api/auth/register, POST /api/feedback."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Редактирование профиля пользователя"
                            secondary="Страница /profile, PUT /api/auth/me."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Вывод GET-результата на экран"
                            secondary="Страница /feedback показывает все отзывы (GET /api/feedback)."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Удаление записей обратной связи"
                            secondary="Кнопка-корзина возле каждого отзыва (DELETE /api/feedback/:id)."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Redux для оптимизации"
                            secondary="Redux Toolkit + RTK Query кэширует ответы. Токен авторизации хранится в Redux."
                        />
                    </ListItem>
                </List>
            </Container>

            <Container title="Проверка связи с сервером (GET /api/health через fetch)">
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Button onClick={checkServer} disabled={loading}>
                        {loading ? 'Запрос...' : 'Проверить'}
                    </Button>
                    {loading && <CircularProgress size={20} />}
                </Box>
                {error && <Alert severity="error">{error}</Alert>}
                {health && (
                    <Alert severity="success">
                        Сервер доступен. Ответ: {JSON.stringify(health)}
                    </Alert>
                )}
            </Container>
        </LabPage>
    );
}
