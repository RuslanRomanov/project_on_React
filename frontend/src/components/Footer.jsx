import React from 'react';
import { Box, Typography, Paper, BottomNavigation, BottomNavigationAction, useMediaQuery } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from 'react-router-dom';

// ЛР 3: компонент Footer (нижний колонтитул).
// ЛР 7: нижнее меню быстрых действий (BottomNavigation) - обратная связь и пр.
//       Закреплено внизу экрана (position: fixed), чтобы оставаться на месте при прокрутке.
export default function Footer() {
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = useMediaQuery('(max-width:900px)');

    const items = [
        { label: 'Главная', value: '/', icon: <HomeIcon /> },
        { label: 'О себе', value: '/about', icon: <InfoIcon /> },
        { label: 'Связь', value: '/feedback', icon: <FeedbackIcon /> },
        { label: 'Профиль', value: '/profile', icon: <AccountCircleIcon /> },
    ];

    return (
        <Box component="footer" sx={{ mt: 'auto' }}>
            <Box sx={{ py: 2, textAlign: 'center', borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="body2" color="text.secondary">
                    Учебный проект "Лабораторные работы 2-9". Сборка {new Date().getFullYear()}.
                </Typography>
            </Box>
            {isMobile ? (
                <Paper
                    elevation={3}
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: (theme) => theme.zIndex.appBar,
                    }}
                >
                    <BottomNavigation
                        showLabels
                        value={items.find((i) => i.value === location.pathname)?.value || '/'}
                        onChange={(e, v) => navigate(v)}
                    >
                        {items.map((it) => (
                            <BottomNavigationAction
                                key={it.value}
                                label={it.label}
                                value={it.value}
                                icon={it.icon}
                            />
                        ))}
                    </BottomNavigation>
                </Paper>
            ) : null}
        </Box>
    );
}
