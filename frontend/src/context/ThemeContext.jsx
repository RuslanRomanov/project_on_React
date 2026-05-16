import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';

// ЛР 4: Изменение темы (день/ночь) с использованием Context.
// ЛР 7: тема переключается из Header, доступна через хук useThemeMode.

const ThemeModeContext = createContext({
    mode: 'light',
    toggleMode: () => {},
});

export function useThemeMode() {
    return useContext(ThemeModeContext);
}

const STORAGE_KEY = 'lab_theme_mode_v1';

export default function ThemeProvider({ children }) {
    const [mode, setMode] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved === 'dark' ? 'dark' : 'light';
        } catch (e) {
            return 'light';
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, mode);
        } catch (e) {
            // ignore
        }
        document.body.dataset.themeMode = mode;
    }, [mode]);

    const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

    const muiTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    primary: { main: mode === 'dark' ? '#90caf9' : '#1976d2' },
                    secondary: { main: mode === 'dark' ? '#f48fb1' : '#9c27b0' },
                    background: {
                        default: mode === 'dark' ? '#121212' : '#f5f5f5',
                        paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
                    },
                },
                shape: { borderRadius: 8 },
                typography: {
                    fontFamily: 'Roboto, Arial, sans-serif',
                },
            }),
        [mode]
    );

    return (
        <ThemeModeContext.Provider value={{ mode, toggleMode }}>
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeModeContext.Provider>
    );
}
