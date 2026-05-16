import { createSlice } from '@reduxjs/toolkit';

const LS_KEY = 'lab_auth_v1';

function loadFromStorage() {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return { token: null, user: null };
        const parsed = JSON.parse(raw);
        return { token: parsed.token || null, user: parsed.user || null };
    } catch (e) {
        return { token: null, user: null };
    }
}

function saveToStorage(state) {
    try {
        localStorage.setItem(LS_KEY, JSON.stringify({ token: state.token, user: state.user }));
    } catch (e) {
        // ignore
    }
}

const initialState = loadFromStorage();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            saveToStorage(state);
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            saveToStorage(state);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            try {
                localStorage.removeItem(LS_KEY);
            } catch (e) {
                // ignore
            }
        },
    },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;
export default authSlice.reducer;
