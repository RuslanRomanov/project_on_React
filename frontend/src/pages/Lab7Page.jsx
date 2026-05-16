import React from 'react';
import { Typography, List, ListItem, ListItemText, Box, useMediaQuery } from '@mui/material';
import LabPage from '../components/LabPage';
import Container from '../components/Container';
import labs from '../components/labsList';

// ЛР 7: страница-обзор реализованного.
export default function Lab7Page() {
    const lab = labs.find((l) => l.id === 7);
    const isMobile = useMediaQuery('(max-width:600px)');
    const isTablet = useMediaQuery('(max-width:900px)');

    return (
        <LabPage id={7} title={lab.title} description={lab.description}>
            <Container title="Реализовано в ЛР 7">
                <List dense>
                    <ListItem>
                        <ListItemText primary="UI Kit" secondary="Используется Material UI 5 (MUI)." />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Header с навигацией"
                            secondary="Страницы 'Главная' (/), 'О себе' (/about). Также кнопка обратной связи."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Переключение темы в Header"
                            secondary="Кнопка-иконка солнце/луна в правой части Header."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Профиль пользователя в стандарте MUI"
                            secondary="Avatar + Menu с пунктами 'Мой профиль' и 'Выйти'."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Меню как Drawer"
                            secondary="Открывается по нажатию на иконку-бутерброд в Header, скрывается."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Нижнее меню быстрых действий"
                            secondary="BottomNavigation в Footer на мобильных устройствах."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Адаптивность"
                            secondary="useMediaQuery, Grid xs/sm/md, отдельный мобильный режим Header."
                        />
                    </ListItem>
                </List>
            </Container>

            <Container title="Текущий режим устройства (адаптив)">
                <Box>
                    <Typography variant="body1">
                        Ширина экрана: {isMobile ? 'мобильный (до 600px)' : isTablet ? 'планшет (до 900px)' : 'десктоп (от 900px)'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Откройте инструменты разработчика и измените ширину окна. На мобильных в Footer появится нижнее меню,
                        в Header скроется верхняя навигация.
                    </Typography>
                </Box>
            </Container>
        </LabPage>
    );
}
