import React from 'react';
import { Paper, Typography } from '@mui/material';

// ЛР 2: Компонент-контейнер для размещения дочерних элементов на странице.
// Используется как обёртка для блоков с одинаковым фоном/паддингом/тенью.
// Заголовок рендерится как семантический <h2> (внешние страницы используют <h1>).
export default function Container({ children, title, headingLevel = 'h2', sx = {} }) {
    return (
        <Paper elevation={2} sx={{ p: 2, mb: 2, ...sx }}>
            {title ? (
                <Typography
                    variant="h6"
                    component={headingLevel}
                    sx={{ fontWeight: 600, fontSize: 18, mb: 1, mt: 0 }}
                >
                    {title}
                </Typography>
            ) : null}
            {children}
        </Paper>
    );
}
