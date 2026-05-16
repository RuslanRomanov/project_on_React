import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useLoginState from '../hooks/useLoginState';
import useCurrentUser from '../hooks/useCurrentUser';
import { Alert, Box } from '@mui/material';

// ЛР 5: если useLoginState возвращает false - вместо приложения форма авторизации.
// Здесь используется на уровне отдельных страниц (профиль, админ).
export default function RequireAuth({ children, role }) {
    const isLoggedIn = useLoginState();
    const { user } = useCurrentUser();
    const location = useLocation();

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }
    if (role && user.role !== role) {
        return (
            <Box sx={{ mt: 4 }}>
                <Alert severity="error">
                    Доступ запрещён. Требуется роль: {role}. Ваша роль: {user.role}.
                </Alert>
            </Box>
        );
    }
    return children;
}
