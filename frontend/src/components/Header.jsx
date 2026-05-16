import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Box,
    Menu as MuiMenu,
    MenuItem,
    Avatar,
    Tooltip,
    Button as MuiButton,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useThemeMode } from '../context/ThemeContext';
import useLoginState from '../hooks/useLoginState';
import useCurrentUser from '../hooks/useCurrentUser';
import { logout } from '../store/authSlice';

// ЛР 3: Компонент Header
// ЛР 7: Header содержит навигацию по страницам "Главная" и "О себе",
// кнопку переключения темы, профиль пользователя (MUI Avatar) и кнопку открытия меню.
export default function Header({ onOpenMenu }) {
    const { mode, toggleMode } = useThemeMode();
    const isLoggedIn = useLoginState();
    const { user } = useCurrentUser();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');

    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        dispatch(logout());
        setAnchorEl(null);
        navigate('/login');
    };

    return (
        <AppBar position="sticky" color="primary" elevation={2}>
            <Toolbar sx={{ gap: 1 }}>
                <IconButton color="inherit" edge="start" onClick={onOpenMenu} aria-label="Открыть меню">
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ color: 'inherit', textDecoration: 'none', flexShrink: 0 }}
                >
                    Лабораторные 2-9
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                {!isMobile && (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <MuiButton color="inherit" component={Link} to="/">
                            Главная
                        </MuiButton>
                        <MuiButton color="inherit" component={Link} to="/about">
                            О себе
                        </MuiButton>
                        <MuiButton color="inherit" component={Link} to="/feedback">
                            Обратная связь
                        </MuiButton>
                    </Box>
                )}

                <Tooltip title={mode === 'dark' ? 'Светлая тема' : 'Тёмная тема'}>
                    <IconButton color="inherit" onClick={toggleMode} aria-label="Переключить тему">
                        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Tooltip>

                {isLoggedIn ? (
                    <>
                        <Tooltip title="Профиль">
                            <IconButton
                                color="inherit"
                                onClick={(e) => setAnchorEl(e.currentTarget)}
                                aria-label="Профиль пользователя"
                            >
                                <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>
                                    {(user?.username || '?').slice(0, 1).toUpperCase()}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <MuiMenu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                        >
                            <MenuItem disabled>
                                {user?.username} ({user?.role})
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    setAnchorEl(null);
                                    navigate('/profile');
                                }}
                            >
                                <AccountCircleIcon sx={{ mr: 1 }} fontSize="small" />
                                Мой профиль
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <LogoutIcon sx={{ mr: 1 }} fontSize="small" />
                                Выйти
                            </MenuItem>
                        </MuiMenu>
                    </>
                ) : (
                    <MuiButton color="inherit" component={Link} to="/login">
                        Войти
                    </MuiButton>
                )}
            </Toolbar>
        </AppBar>
    );
}
