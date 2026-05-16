import React, { useCallback, useState } from 'react';
import { Box, Typography, TextField, Alert, Stack, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { setCredentials } from '../store/authSlice';
import http from '../api/http';

// ЛР 5: форма авторизации с валидацией через react-hook-form. Обработка submit через useCallback.
// ЛР 6: запрос на /api/auth/login через axios.
export default function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ defaultValues: { username: '', password: '' } });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [serverError, setServerError] = useState('');

    const onSubmit = useCallback(
        async (data) => {
            setServerError('');
            try {
                const res = await http.post('/auth/login', data);
                dispatch(setCredentials({ token: res.data.token, user: res.data.user }));
                const redirectTo = location.state?.from || '/';
                navigate(redirectTo);
            } catch (e) {
                setServerError(e.response?.data?.error || 'Не удалось войти');
            }
        },
        [dispatch, navigate, location.state]
    );

    return (
        <Box sx={{ maxWidth: 420, mx: 'auto', mt: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Вход в приложение
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Тестовые учётки: admin / admin (роль admin) и user / user (роль user).
                </Typography>
                {serverError && <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Stack spacing={2}>
                        <TextField
                            label="Логин"
                            fullWidth
                            autoFocus
                            error={!!errors.username}
                            helperText={errors.username?.message}
                            {...register('username', {
                                required: 'Введите логин',
                                minLength: { value: 3, message: 'Не короче 3 символов' },
                            })}
                        />
                        <TextField
                            label="Пароль"
                            type="password"
                            fullWidth
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            {...register('password', {
                                required: 'Введите пароль',
                                minLength: { value: 4, message: 'Не короче 4 символов' },
                            })}
                        />
                        <Button type="submit" fullWidth disabled={isSubmitting}>
                            {isSubmitting ? 'Вход...' : 'Войти'}
                        </Button>
                        <Typography variant="body2" align="center">
                            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
