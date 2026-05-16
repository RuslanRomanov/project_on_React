import React from 'react';
import { Box, Typography, Card, CardContent, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import labs from '../components/labsList';

// ЛР 7: Главная - отдельная страница.
// Для адаптивной сетки используется CSS Grid через Box sx (не устаревший MUI Grid v1).
export default function HomePage() {
    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                Добро пожаловать
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }} color="text.secondary">
                Это сборный учебный проект на React + Node.js + PostgreSQL, в котором последовательно реализованы
                лабораторные работы 2-9. Выберите интересующую вас лабораторную из списка ниже или из бокового меню.
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gap: 2,
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        md: 'repeat(3, 1fr)',
                    },
                }}
            >
                {labs.map((lab) => (
                    <Card key={lab.id}>
                        <CardActionArea component={Link} to={lab.path}>
                            <CardContent>
                                <Typography variant="overline" color="primary">
                                    Лабораторная работа {lab.id}
                                </Typography>
                                <Typography variant="h6" component="h2" gutterBottom>
                                    {lab.title.replace('ЛР ' + lab.id + ': ', '')}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {lab.description.length > 140
                                        ? lab.description.slice(0, 140) + '...'
                                        : lab.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Box>
    );
}
