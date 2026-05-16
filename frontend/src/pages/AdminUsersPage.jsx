import React, { useMemo } from 'react';
import { Box, Typography, Chip, Stack, Alert, CircularProgress } from '@mui/material';
import DataTable from '../components/DataTable';
import Button from '../components/Button';
import {
    useGetUsersQuery,
    useBlockUserMutation,
    useDeleteUserMutation,
} from '../store/api';

// ЛР 8: список пользователей в виде таблицы. Действия Удалить / Заблокировать.
export default function AdminUsersPage() {
    const { data: users, isLoading, isError, error, isFetching } = useGetUsersQuery();
    const [blockUser] = useBlockUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const columns = useMemo(
        () => [
            { id: 'id', accessorKey: 'id', header: 'ID', cell: (info) => info.getValue() },
            { id: 'username', accessorKey: 'username', header: 'Логин' },
            { id: 'full_name', accessorKey: 'full_name', header: 'Имя' },
            { id: 'email', accessorKey: 'email', header: 'Email' },
            {
                id: 'role',
                accessorKey: 'role',
                header: 'Роль',
                cell: (info) => (
                    <Chip
                        size="small"
                        label={info.getValue()}
                        color={info.getValue() === 'admin' ? 'primary' : 'default'}
                    />
                ),
            },
            {
                id: 'is_blocked',
                accessorKey: 'is_blocked',
                header: 'Статус',
                cell: (info) =>
                    info.getValue() ? (
                        <Chip size="small" label="Заблокирован" color="error" />
                    ) : (
                        <Chip size="small" label="Активен" color="success" />
                    ),
            },
            {
                id: 'created_at',
                accessorKey: 'created_at',
                header: 'Создан',
                cell: (info) => new Date(info.getValue()).toLocaleDateString('ru-RU'),
            },
            {
                id: 'actions',
                header: 'Действия',
                enableSorting: false,
                cell: (info) => {
                    const u = info.row.original;
                    return (
                        <Stack direction="row" spacing={1}>
                            <Button
                                size="small"
                                variant="outlined"
                                color={u.is_blocked ? 'success' : 'warning'}
                                onClick={async () => {
                                    try {
                                        await blockUser({ id: u.id, isBlocked: !u.is_blocked }).unwrap();
                                    } catch (e) {
                                        alert(e?.data?.error || 'Ошибка');
                                    }
                                }}
                            >
                                {u.is_blocked ? 'Разблок' : 'Блок'}
                            </Button>
                            <Button
                                size="small"
                                variant="outlined"
                                color="error"
                                onClick={async () => {
                                    if (!window.confirm('Удалить пользователя ' + u.username + '?')) return;
                                    try {
                                        await deleteUser(u.id).unwrap();
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
        [blockUser, deleteUser]
    );

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h4">Пользователи</Typography>
                {isFetching && !isLoading && <CircularProgress size={20} />}
            </Box>

            {isLoading && (
                <Box sx={{ py: 4, textAlign: 'center' }}>
                    <CircularProgress />
                </Box>
            )}

            {isError && (
                <Alert severity="error">
                    Не удалось загрузить пользователей: {error?.data?.error || 'неизвестная ошибка'}
                </Alert>
            )}

            {!isLoading && !isError && (
                <>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Перетаскивайте колонки за иконку слева от заголовка. Клик по заголовку - сортировка.
                    </Typography>
                    <DataTable columns={columns} data={users || []} stickyFirstColumn />
                </>
            )}
        </Box>
    );
}
