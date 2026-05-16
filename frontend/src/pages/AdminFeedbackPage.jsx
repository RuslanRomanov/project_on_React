import React, { useMemo } from 'react';
import { Box, Typography, Chip, Stack, Alert, CircularProgress, Rating } from '@mui/material';
import DataTable from '../components/DataTable';
import Button from '../components/Button';
import {
    useGetFeedbackQuery,
    useBlockFeedbackMutation,
    useDeleteFeedbackMutation,
} from '../store/api';

// ЛР 8: перенесён блок управления обратной связью в админ-панель.
export default function AdminFeedbackPage() {
    const { data: feedback, isLoading, isError, error, isFetching } = useGetFeedbackQuery();
    const [blockFeedback] = useBlockFeedbackMutation();
    const [deleteFeedback] = useDeleteFeedbackMutation();

    const columns = useMemo(
        () => [
            { id: 'id', accessorKey: 'id', header: 'ID' },
            { id: 'author_name', accessorKey: 'author_name', header: 'Автор' },
            {
                id: 'message',
                accessorKey: 'message',
                header: 'Сообщение',
                cell: (info) => {
                    const v = info.getValue();
                    return v.length > 80 ? v.slice(0, 80) + '...' : v;
                },
            },
            {
                id: 'rating',
                accessorKey: 'rating',
                header: 'Оценка',
                cell: (info) => <Rating value={info.getValue()} readOnly size="small" />,
            },
            {
                id: 'is_blocked',
                accessorKey: 'is_blocked',
                header: 'Статус',
                cell: (info) =>
                    info.getValue() ? (
                        <Chip size="small" label="Заблокирован" color="error" />
                    ) : (
                        <Chip size="small" label="Виден всем" color="success" />
                    ),
            },
            {
                id: 'created_at',
                accessorKey: 'created_at',
                header: 'Дата',
                cell: (info) => new Date(info.getValue()).toLocaleString('ru-RU'),
            },
            {
                id: 'actions',
                header: 'Действия',
                enableSorting: false,
                cell: (info) => {
                    const f = info.row.original;
                    return (
                        <Stack direction="row" spacing={1}>
                            <Button
                                size="small"
                                variant="outlined"
                                color={f.is_blocked ? 'success' : 'warning'}
                                onClick={async () => {
                                    try {
                                        await blockFeedback({ id: f.id, isBlocked: !f.is_blocked }).unwrap();
                                    } catch (e) {
                                        alert(e?.data?.error || 'Ошибка');
                                    }
                                }}
                            >
                                {f.is_blocked ? 'Разблок' : 'Блок'}
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={async () => {
                                    if (!window.confirm('Удалить отзыв?')) return;
                                    try {
                                        await deleteFeedback(f.id).unwrap();
                                    } catch (e) {
                                        alert(e?.data?.error || 'Ошибка');
                                    }
                                }}
                            >
                                Удалить
                            </Button>
                        </Stack>
                    );
                },
            },
        ],
        [blockFeedback, deleteFeedback]
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h4">Управление отзывами</Typography>
                {isFetching && !isLoading && <CircularProgress size={20} />}
            </Box>

            {isLoading && (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                    <CircularProgress />
                </Box>
            )}

            {isError && (
                <Alert severity="error">
                    Не удалось загрузить отзывы: {error?.data?.error || 'неизвестная ошибка'}
                </Alert>
            )}

            {!isLoading && !isError && (
                <DataTable columns={columns} data={feedback || []} stickyFirstColumn />
            )}
        </Box>
    );
}
