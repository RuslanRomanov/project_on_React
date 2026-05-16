import React from 'react';
import { Box, Typography, Chip, Divider } from '@mui/material';

// Обёртка для содержимого страницы конкретной ЛР: заголовок, описание, дочерний контент.
export default function LabPage({ id, title, description, children }) {
    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Chip label={'ЛР ' + id} color="primary" />
                <Typography variant="h5" component="h1">
                    {title.replace('ЛР ' + id + ': ', '')}
                </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {description}
            </Typography>
            <Divider sx={{ mb: 3 }} />
            {children}
        </Box>
    );
}
