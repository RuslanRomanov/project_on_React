import React, { useCallback, useState } from 'react';
import { Box, Typography, TextField, Stack, Paper, Alert, Avatar } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Button from '../components/Button';
import useCurrentUser from '../hooks/useCurrentUser';
import http from '../api/http';
import { updateUser } from '../store/authSlice';

// ЛР 6: возможность редактирования профиля пользователя (PUT /api/auth/me).
export default function ProfilePage() {
    const { user } = useCurrentUser();
    const dispatch = useDispatch();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: user?.email || '',
            fullName: user?.fullName || '',
        },
    });

    const onSubmit = useCallback(
        async (data) => {
            setMessage('');
            setError('');
            try {
                const res = await http.put('/auth/me', data);
                dispatch(updateUser({ email: res.data.email, fullName: res.data.fullName }));
                setMessage('Профиль успешно обновлён');
            } catch (e) {
                setError(e.response?.data?.error || 'Не удалось обновить профиль');
            }
        },
        [dispatch]
    );

    if (!user) return null;

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                Мой профиль
            </Typography>
            <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
                    <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', fontSize: 28 }}>
                        {(user.username || '?').slice(0, 1).toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography variant="h6">{user.username}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Роль: {user.role}
                        </Typography>
                    </Box>
                </Box>

                {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Stack spacing={2}>
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
                            {...register('fullName', {
                                maxLength: { value: 128, message: 'Не длиннее 128 символов' },
                            })}
                        />
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
                        </Button>
                    </Stack>
                </form>
            </Paper>
        </Box>
    );
}
