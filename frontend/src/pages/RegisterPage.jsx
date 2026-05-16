import React, { useCallback, useState } from 'react';
import { Box, Typography, TextField, Alert, Stack, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { setCredentials } from '../store/authSlice';
import http from '../api/http';

// ЛР 5: форма регистрации с валидацией. ЛР 6: POST /api/auth/register.
export default function RegisterPage() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: { username: '', email: '', fullName: '', password: '', passwordConfirm: '' },
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');

    const passwordValue = watch('password');

    const onSubmit = useCallback(
        async (data) => {
            setServerError('');
            try {
                const { passwordConfirm, ...payload } = data;
                const res = await http.post('/auth/register', payload);
                dispatch(setCredentials({ token: res.data.token, user: res.data.user }));
                navigate('/');
            } catch (e) {
                setServerError(e.response?.data?.error || 'Не удалось зарегистрироваться');
            }
        },
        [dispatch, navigate]
    );

    return (
        <Box sx={{ maxWidth: 480, mx: 'auto', mt: 4 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Регистрация
                </Typography>
                {serverError && <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Stack spacing={2}>
                        <TextField
                            label="Логин"
                            fullWidth
                            error={!!errors.username}
                            helperText={errors.username?.message}
                            {...register('username', {
                                required: 'Введите логин',
                                minLength: { value: 3, message: 'Не короче 3 символов' },
                                maxLength: { value: 32, message: 'Не длиннее 32 символов' },
                                pattern: { value: /^[a-zA-Z0-9_]+$/, message: 'Только латиница, цифры и _' },
                            })}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            {...register('email', {
                                required: 'Введите email',
                                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Неверный формат email' },
                            })}
                        />
                        <TextField
                            label="Полное имя"
                            fullWidth
                            error={!!errors.fullName}
                            helperText={errors.fullName?.message}
                            {...register('fullName', {
                                maxLength: { value: 128, message: 'Не длиннее 128 символов' },
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
                        <TextField
                            label="Повторите пароль"
                            type="password"
                            fullWidth
                            error={!!errors.passwordConfirm}
                            helperText={errors.passwordConfirm?.message}
                            {...register('passwordConfirm', {
                                required: 'Повторите пароль',
                                validate: (v) => v === passwordValue || 'Пароли не совпадают',
                            })}
                        />
                        <Button type="submit" fullWidth disabled={isSubmitting}>
                            {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
                        </Button>
                        <Typography variant="body2" align="center">
                            Уже есть аккаунт? <Link to="/login">Войти</Link>
                        </Typography>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
