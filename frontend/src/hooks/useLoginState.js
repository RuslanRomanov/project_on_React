import { useSelector } from 'react-redux';

// ЛР 5: Кастомный хук useLoginState.
// Возвращает true / false - статус авторизации, как указано в задании.
// Для доступа к данным пользователя используется отдельный хук useCurrentUser.
export default function useLoginState() {
    const token = useSelector((s) => s.auth.token);
    const user = useSelector((s) => s.auth.user);
    return !!token && !!user;
}
