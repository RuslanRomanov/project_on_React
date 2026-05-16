import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import useLoginState from './hooks/useLoginState';

// ЛР 9: "Ленивые" импорты страниц - разбиение приложения на chunks.
// Каждая страница загружается как отдельный chunk при первом обращении.
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const FeedbackPage = lazy(() => import('./pages/FeedbackPage'));
const AdminUsersPage = lazy(() => import('./pages/AdminUsersPage'));
const AdminFeedbackPage = lazy(() => import('./pages/AdminFeedbackPage'));
const Lab2Page = lazy(() => import('./pages/Lab2Page'));
const Lab3Page = lazy(() => import('./pages/Lab3Page'));
const Lab4Page = lazy(() => import('./pages/Lab4Page'));
const Lab5Page = lazy(() => import('./pages/Lab5Page'));
const Lab6Page = lazy(() => import('./pages/Lab6Page'));
const Lab7Page = lazy(() => import('./pages/Lab7Page'));
const Lab8Page = lazy(() => import('./pages/Lab8Page'));
const Lab9Page = lazy(() => import('./pages/Lab9Page'));

function PageSpinner() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
        </Box>
    );
}

// ЛР 5: Если useLoginState возвращает true - отрисовать приложение,
//       иначе форму авторизации.
// ЛР 4: React Router - обработчик роутов в Content. Все переходы регулируются единым набором маршрутов.
export default function App() {
    const isLoggedIn = useLoginState();

    // Гостевые маршруты: только формы авторизации и регистрации.
    // Любой иной URL приводит на /login.
    if (!isLoggedIn) {
        return (
            <Suspense fallback={<PageSpinner />}>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </Suspense>
        );
    }

    // Приложение для авторизованных пользователей.
    return (
        <Layout>
            <Suspense fallback={<PageSpinner />}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/feedback" element={<FeedbackPage />} />
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* Если уже авторизован, /login и /register перенаправляют на главную */}
                    <Route path="/login" element={<Navigate to="/" replace />} />
                    <Route path="/register" element={<Navigate to="/" replace />} />

                    <Route
                        path="/admin/users"
                        element={
                            <RequireAuth role="admin">
                                <AdminUsersPage />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/admin/feedback"
                        element={
                            <RequireAuth role="admin">
                                <AdminFeedbackPage />
                            </RequireAuth>
                        }
                    />

                    <Route path="/lab/2" element={<Lab2Page />} />
                    <Route path="/lab/3" element={<Lab3Page />} />
                    <Route path="/lab/4" element={<Lab4Page />} />
                    <Route path="/lab/5" element={<Lab5Page />} />
                    <Route path="/lab/6" element={<Lab6Page />} />
                    <Route path="/lab/7" element={<Lab7Page />} />
                    <Route path="/lab/8" element={<Lab8Page />} />
                    <Route path="/lab/9" element={<Lab9Page />} />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </Layout>
    );
}
