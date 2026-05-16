import React, { useCallback, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Stack,
    Paper,
    List,
    ListItem,
    ListItemText,
    Rating,
    Alert,
    CircularProgress,
    IconButton,
    Divider,
    Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import Container from '../components/Container';
import useCurrentUser from '../hooks/useCurrentUser';
import {
    useGetFeedbackQuery,
    useAddFeedbackMutation,
    useDeleteFeedbackMutation,
} from '../store/api';

// ЛР 5: блок обратной связи (форма + список).
// ЛР 6: GET/POST/DELETE на /api/feedback.
// ЛР 9: рефакторинг страницы списка данных с сервера на RTK Query (useGetFeedbackQuery).
//       isLoading -> спиннер, isError -> сообщение, isFetching -> индикатор обновления.
export default function FeedbackPage() {
    const { user, isAdmin } = useCurrentUser();

    const {
        data: feedback,
        isLoading,
        isError,
        isFetching,
        error,
        refetch,
    } = useGetFeedbackQuery();

    const [addFeedback, { isLoading: isAdding }] = useAddFeedbackMutation();
    const [deleteFeedback] = useDeleteFeedbackMutation();

    const [rating, setRating] = useState(5);
    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            authorName: user?.fullName || user?.username || '',
            message: '',
        },
    });

    const onSubmit = useCallback(
        async (data) => {
            setServerError('');
            try {
                await addFeedback({ ...data, rating }).unwrap();
                reset({ authorName: data.authorName, message: '' });
                setRating(5);
            } catch (e) {
                setServerError(e?.data?.error || 'Не удалось отправить отзыв');
            }
        },
        [addFeedback, rating, reset]
    );

    const onDelete = useCallback(
        async (id) => {
            if (!window.confirm('Удалить этот отзыв?')) return;
            try {
                await deleteFeedback(id).unwrap();
            } catch (e) {
                alert(e?.data?.error || 'Не удалось удалить отзыв');
            }
        },
        [deleteFeedback]
    );

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Обратная связь
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {isAdmin
                    ? 'Оставьте отзыв или используйте админ-панель для модерации. Все отзывы сохраняются на сервере (PostgreSQL).'
                    : 'Список отзывов пользователей. Для модерации откройте раздел администрирования.'}
            </Typography>

            {isAdmin && (
            <Container title="Оставить отзыв">
                {serverError && <Alert severity="error" sx={{ mb: 2 }}>{serverError}</Alert>}
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Stack spacing={2}>
                        <TextField
                            label="Ваше имя"
                            fullWidth
                            error={!!errors.authorName}
                            helperText={errors.authorName?.message}
                            {...register('authorName', {
                                required: 'Введите имя',
                                minLength: { value: 2, message: 'Не короче 2 символов' },
                            })}
                        />
                        <TextField
                            label="Сообщение"
                            multiline
                            minRows={3}
                            fullWidth
                            error={!!errors.message}
                            helperText={errors.message?.message}
                            {...register('message', {
                                required: 'Введите сообщение',
                                minLength: { value: 3, message: 'Не короче 3 символов' },
                            })}
                        />
                        <Box>
                            <Typography component="legend" variant="body2">
                                Оценка
                            </Typography>
                            <Rating value={rating} onChange={(e, v) => setRating(v || 1)} />
                        </Box>
                        <Button type="submit" disabled={isAdding}>
                            {isAdding ? 'Отправка...' : 'Отправить отзыв'}
                        </Button>
                    </Stack>
                </form>
            </Container>
            )}

            <Paper sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Отзывы пользователей</Typography>
                    <Box sx={{ flex: 1 }} />
                    {isFetching && !isLoading && <CircularProgress size={20} sx={{ mr: 1 }} />}
                    <Button variant="text" onClick={refetch}>
                        Обновить
                    </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />

                {isLoading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                    </Box>
                )}

                {isError && (
                    <Alert severity="error">
                        Не удалось загрузить отзывы: {error?.data?.error || error?.error || 'неизвестная ошибка'}
                    </Alert>
                )}

                {!isLoading && !isError && (
                    <List>
                        {(feedback || []).length === 0 && (
                            <Typography variant="body2" color="text.secondary">
                                Пока нет отзывов. Будьте первым!
                            </Typography>
                        )}
                        {(feedback || []).map((f) => {
                            // ЛР 8: в пользовательском приложении блок обратной связи только на чтение,
                            // удаление - только для админа (отдельно полная модерация в /admin/feedback).
                            const canDelete = isAdmin;
                            return (
                                <ListItem
                                    key={f.id}
                                    divider
                                    secondaryAction={
                                        canDelete && (
                                            <Tooltip title="Удалить отзыв">
                                                <IconButton edge="end" onClick={() => onDelete(f.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )
                                    }
                                >
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <strong>{f.author_name}</strong>
                                                <Rating value={f.rating} readOnly size="small" />
                                            </Box>
                                        }
                                        secondary={
                                            <>
                                                {f.message}
                                                <br />
                                                <Typography component="span" variant="caption" color="text.secondary">
                                                    {new Date(f.created_at).toLocaleString('ru-RU')}
                                                </Typography>
                                            </>
                                        }
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                )}
            </Paper>
        </Box>
    );
}
