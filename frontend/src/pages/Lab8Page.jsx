import React from 'react';
import { Typography, List, ListItem, ListItemText, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LabPage from '../components/LabPage';
import Container from '../components/Container';
import labs from '../components/labsList';
import useLoginState from '../hooks/useLoginState';
import useCurrentUser from '../hooks/useCurrentUser';

// ЛР 8: обзорная страница, ссылается на админ-страницы.
export default function Lab8Page() {
    const lab = labs.find((l) => l.id === 8);
    const isLoggedIn = useLoginState();
    const { isAdmin } = useCurrentUser();

    return (
        <LabPage id={8} title={lab.title} description={lab.description}>
            <Container title="Реализовано в ЛР 8">
                <List dense>
                    <ListItem>
                        <ListItemText
                            primary="Таблицы на @tanstack/react-table"
                            secondary="frontend/src/components/DataTable.jsx - универсальная таблица с сортировкой и DnD колонок."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Роли пользователей admin/user"
                            secondary="Поле role в таблице users. Поведение приложения зависит от роли."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Админ-блок"
                            secondary={
                                <>
                                    <RouterLink to="/admin/users">/admin/users</RouterLink> - список пользователей.{' '}
                                    <RouterLink to="/admin/feedback">/admin/feedback</RouterLink> - управление отзывами.
                                </>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Действия Удалить, Заблокировать"
                            secondary="Доступны в админ-таблицах. У пользователей: блок и удаление. У отзывов: блок и удаление."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="У обычного пользователя обратная связь только на чтение"
                            secondary="На странице /feedback форма отправки отзыва и кнопки удаления показаны только администратору. Обычные пользователи видят только список отзывов."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Сортировка колонок"
                            secondary="Клик по заголовку колонки переключает сортировку (asc/desc/без)."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Перетаскивание колонок"
                            secondary="Зажмите иконку 'перетащить' (||) на заголовке и перетащите колонку в другую позицию."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Закрепление первой колонки на мобильных"
                            secondary="На экранах меньше 600px первая колонка таблицы фиксируется, остальные скроллятся горизонтально."
                        />
                    </ListItem>
                </List>
            </Container>

            <Container title="Доступ">
                {isAdmin ? (
                    <Alert severity="success">
                        Вы вошли как администратор. Доступны страницы{' '}
                        <RouterLink to="/admin/users">пользователи</RouterLink> и{' '}
                        <RouterLink to="/admin/feedback">управление отзывами</RouterLink>.
                    </Alert>
                ) : isLoggedIn ? (
                    <Alert severity="info">
                        Вы вошли как обычный пользователь. Админ-блок недоступен. Войдите как admin / admin для доступа.
                    </Alert>
                ) : (
                    <Alert severity="warning">
                        Вы не авторизованы. Для доступа к админ-блоку войдите как admin / admin.
                    </Alert>
                )}
            </Container>
        </LabPage>
    );
}
