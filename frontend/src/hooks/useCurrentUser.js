import { useSelector } from 'react-redux';

// Вспомогательный хук для доступа к данным авторизованного пользователя.
// Используется вместе с useLoginState (который возвращает только true/false).
export default function useCurrentUser() {
    const user = useSelector((s) => s.auth.user);
    return {
        user,
        role: user?.role || null,
        isAdmin: user?.role === 'admin',
    };
}
