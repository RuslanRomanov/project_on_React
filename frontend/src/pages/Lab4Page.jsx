import React, { useEffect, useState } from 'react';
import { Box, Typography, Stack, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import LabPage from '../components/LabPage';
import Container from '../components/Container';
import Button from '../components/Button';
import labs from '../components/labsList';
import { useThemeMode } from '../context/ThemeContext';
import { increment, decrement, incrementByAmount, reset } from '../store/counterSlice';

// Дочерний компонент - демонстрирует useEffect на mount/unmount.
function MountDemo() {
    useEffect(() => {
        console.log('[ЛР 4] MountDemo: компонент смонтирован');
        return () => {
            console.log('[ЛР 4] MountDemo: компонент размонтирован');
        };
    }, []);

    const [tick, setTick] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setTick((t) => t + 1), 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <Alert severity="info">
            Этот блок смонтирован {tick} секунд назад. См. сообщения в консоли браузера о mount/unmount.
        </Alert>
    );
}

export default function Lab4Page() {
    const lab = labs.find((l) => l.id === 4);
    const { mode, toggleMode } = useThemeMode();
    const dispatch = useDispatch();
    const counter = useSelector((s) => s.counter.value);
    const [showDemo, setShowDemo] = useState(true);

    return (
        <LabPage id={4} title={lab.title} description={lab.description}>
            <Container title="Тема через Context (день / ночь)">
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Текущая тема: <strong>{mode === 'dark' ? 'тёмная' : 'светлая'}</strong>. Тема хранится
                    в React Context (frontend/src/context/ThemeContext.jsx) и сохраняется в localStorage.
                </Typography>
                <Button onClick={toggleMode}>Переключить тему</Button>
            </Container>

            <Container title="useState + useEffect">
                <Typography variant="body2" sx={{ mb: 2 }}>
                    Нажмите кнопку, чтобы смонтировать/размонтировать дочерний компонент. В консоли браузера
                    появятся сообщения от useEffect.
                </Typography>
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Button onClick={() => setShowDemo((v) => !v)}>
                        {showDemo ? 'Размонтировать' : 'Смонтировать'}
                    </Button>
                </Stack>
                {showDemo && <MountDemo />}
            </Container>

            <Container title="Redux: счётчик (increment / decrement / reset)">
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Значение: {counter}
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button onClick={() => dispatch(increment())}>+1 (increment)</Button>
                    <Button onClick={() => dispatch(decrement())}>-1 (decrement)</Button>
                    <Button onClick={() => dispatch(incrementByAmount(5))}>+5</Button>
                    <Button variant="outlined" color="secondary" onClick={() => dispatch(reset())}>
                        Сброс
                    </Button>
                </Stack>
            </Container>

            <Container title="React Router">
                <Typography variant="body2">
                    React Router внедрён в проект. URL переходов: /, /about, /lab/2 ... /lab/9, /login,
                    /register, /feedback, /profile, /admin/users, /admin/feedback. Все переходы из меню работают
                    через NavLink / Link.
                </Typography>
            </Container>
        </LabPage>
    );
}
