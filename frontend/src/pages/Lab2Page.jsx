import React, { useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import LabPage from '../components/LabPage';
import Button from '../components/Button';
import Container from '../components/Container';
import labs from '../components/labsList';

// ЛР 2: демонстрация Hello World, кнопки и контейнера.
export default function Lab2Page() {
    const lab = labs.find((l) => l.id === 2);
    const [clicks, setClicks] = useState(0);

    return (
        <LabPage id={2} title={lab.title} description={lab.description}>
            <Container title="Hello World">
                <Typography variant="h6">Привет, мир!</Typography>
                <Typography variant="body2" color="text.secondary">
                    Это базовое React-приложение, созданное с помощью Vite.
                </Typography>
            </Container>

            <Container title="Демонстрация компонента Button">
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Реализован собственный компонент Button (frontend/src/components/Button.jsx).
                    Принимает onClick, variant, color, disabled и другие пропсы.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button onClick={() => setClicks((c) => c + 1)}>
                        Нажать (счёт: {clicks})
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => setClicks(0)}>
                        Сбросить
                    </Button>
                    <Button disabled>Заблокированная</Button>
                </Stack>
            </Container>

            <Container title="Демонстрация компонента Container">
                <Typography variant="body2">
                    Текущий блок - это сам компонент Container. Он используется как обёртка для разделов страницы:
                    задаёт фон, отступы и тень. Применяется на всех страницах лабораторных работ.
                </Typography>
            </Container>

            <Container title="Шаблон страницы и навигация">
                <Typography variant="body2">
                    Вокруг этой страницы построен шаблон с Header, боковым Menu и Footer. Это решает задачу
                    "Реализовать шаблон страницы и разместить на нем компоненты навигации".
                </Typography>
            </Container>
        </LabPage>
    );
}
