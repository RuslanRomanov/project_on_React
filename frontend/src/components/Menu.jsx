import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Box,
    Typography,
    ListItemIcon,
} from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link, useLocation } from 'react-router-dom';
import labs from './labsList';
import useCurrentUser from '../hooks/useCurrentUser';

// ЛР 3: компонент Menu со списком лабораторных работ.
// ЛР 7: меню скрываемое, вызывается из Header (Drawer).
export default function Menu({ open, onClose }) {
    const location = useLocation();
    const { isAdmin } = useCurrentUser();

    return (
        <Drawer anchor="left" open={open} onClose={onClose}>
            <Box sx={{ width: 280 }} role="presentation" onClick={onClose}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6">Лабораторные работы</Typography>
                </Box>
                <Divider />
                <List>
                    {labs.map((l) => (
                        <ListItem key={l.id} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={l.path}
                                selected={location.pathname === l.path}
                            >
                                <ListItemIcon>
                                    <ScienceIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary={'ЛР ' + l.id}
                                    secondary={l.title.replace('ЛР ' + l.id + ': ', '')}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {isAdmin && (
                    <>
                        <Divider />
                        <List>
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="/admin/users">
                                    <ListItemIcon>
                                        <AdminPanelSettingsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Пользователи" />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton component={Link} to="/admin/feedback">
                                    <ListItemIcon>
                                        <AdminPanelSettingsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Управление отзывами" />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </>
                )}
            </Box>
        </Drawer>
    );
}
