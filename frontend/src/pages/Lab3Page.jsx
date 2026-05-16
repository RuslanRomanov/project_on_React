import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import LabPage from '../components/LabPage';
import Container from '../components/Container';
import labs from '../components/labsList';

// ЛР 3: список лабораторных в меню и контенте.
export default function Lab3Page() {
    const lab = labs.find((l) => l.id === 3);
    return (
        <LabPage id={3} title={lab.title} description={lab.description}>
            <Container title="Что реализовано">
                <Typography variant="body2" paragraph>
                    Шаблон страницы построен из четырёх компонентов:
                </Typography>
                <List dense>
                    <ListItem>
                        <ListItemText
                            primary="Header"
                            secondary="frontend/src/components/Header.jsx - шапка с навигацией и кнопкой меню."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Menu"
                            secondary="frontend/src/components/Menu.jsx - боковой Drawer со списком лабораторных работ."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Content"
                            secondary="То, что вы сейчас читаете. Контент - children компонента Layout."
                        />
                    </ListItem>
                    <ListItem>
                        <ListItemText
                            primary="Footer"
                            secondary="frontend/src/components/Footer.jsx - нижний колонтитул и нижнее меню."
                        />
                    </ListItem>
                </List>
            </Container>

            <Container title="Список лабораторных работ (для меню)">
                <List dense>
                    {labs.map((l) => (
                        <ListItem key={l.id} divider>
                            <ListItemText primary={l.title} secondary={l.description} />
                        </ListItem>
                    ))}
                </List>
            </Container>
        </LabPage>
    );
}
