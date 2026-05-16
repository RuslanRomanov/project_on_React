import React from 'react';
import { Typography, List, ListItem, ListItemText, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LabPage from '../components/LabPage';
import Container from '../components/Container';
import labs from '../components/labsList';
import useLoginState from '../hooks/useLoginState';
import useCurrentUser from '../hooks/useCurrentUser';

// ЛР 5: обзорная страница - показывает, что было сделано, и направляет на функциональные страницы.
export default function Lab5Page() {
    const lab = labs.find((l) => l.id === 5);
    const isLoggedIn = useLoginState();
    const { user } = useCurrentUser();

    return (
        <LabPage id={5} title={lab.title} description={lab.description}>
            <Container title="Реализовано в ЛР 5">
                <List dense>
                    <ListItem>
                        <ListItemText
                            primary="Форма авторизации"
                            secondary={<>Страница <RouterLink to="/login">/login</RouterLink>. Валидация через react-hook-form. Submit обёрнут в useCallback.</>}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Форма регистрации"
                            secondary={<>Страница <RouterLink to="/register">/register</RouterLink>. Валидация email, длины полей, совпадения паролей.</>}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Блок обратной связи"
                            secondary={<>Страница <RouterLink to="/feedback">/feedback</RouterLink>. Форма и список отзывов.</>}
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Кастомный хук useLoginState"
                            secondary="frontend/src/hooks/useLoginState.js. Возвращает true / false - статус авторизации (как указано в задании). Доступ к данным пользователя - через хук useCurrentUser."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Профиль с кнопкой выхода"
                            secondary="В правом верхнем углу Header. Открывает меню с пунктами 'Мой профиль' и 'Выйти'."
                        />
                    </ListItem>
                </List>
            </Container>

            <Container title="Состояние авторизации">
                {isLoggedIn ? (
                    <Alert severity="success">
                        Вы авторизованы как {user.username} (роль: {user.role}). useLoginState вернул true.
                    </Alert>
                ) : (
                    <Alert severity="info">
                        Вы не авторизованы. useLoginState вернул false.
                        <br />
                        Попробуйте войти как admin / admin или user / user.
                    </Alert>
                )}
            </Container>
        </LabPage>
    );
}
