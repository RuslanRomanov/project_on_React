import React from 'react';
import { Typography, List, ListItem, ListItemText, Alert } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LabPage from '../components/LabPage';
import Container from '../components/Container';
import labs from '../components/labsList';

// ЛР 9: обзорная страница.
export default function Lab9Page() {
    const lab = labs.find((l) => l.id === 9);
    return (
        <LabPage id={9} title={lab.title} description={lab.description}>
            <Container title="Реализовано в ЛР 9">
                <List dense>
                    <ListItem>
                        <ListItemText
                            primary="Тест компонента Button"
                            secondary="frontend/src/__tests__/Button.test.jsx. Vitest + React Testing Library. Запуск: npm test."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Рефакторинг на RTK Query"
                            secondary={
                                <>
                                    Страница <RouterLink to="/feedback">/feedback</RouterLink> использует
                                    хук useGetFeedbackQuery (frontend/src/store/api.js). Запрос автоматически кэшируется,
                                    повторно инвалидируется после мутаций (добавить / удалить отзыв).
                                </>
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="isLoading / isError / isFetching"
                            secondary="На странице обратной связи: спиннер при первой загрузке (isLoading), сообщение об ошибке (isError), мини-спиннер при обновлении (isFetching)."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Lazy-импорты страниц"
                            secondary="frontend/src/App.jsx использует React.lazy для всех страниц лабораторных работ и Suspense с fallback-спиннером. Сборка получается разбитой на chunks."
                        />
                    </ListItem>
                </List>
            </Container>

            <Container title="Как запустить тесты">
                <Typography variant="body2" sx={{ mb: 1 }}>
                    В терминале из папки frontend выполнить:
                </Typography>
                <Alert severity="info" sx={{ fontFamily: 'monospace' }}>
                    npm test
                </Alert>
            </Container>
        </LabPage>
    );
}
