import React from 'react';
import { Button as MuiButton } from '@mui/material';

// ЛР 2: Компонент-кнопка. В ЛР 7 обёрнут поверх MUI Button для соблюдения стандарта UI Kit.
// Принимает: children, onClick, variant, color, disabled, type, fullWidth, startIcon
export default function Button({
    children,
    onClick,
    variant = 'contained',
    color = 'primary',
    disabled = false,
    type = 'button',
    fullWidth = false,
    startIcon = null,
    size = 'medium',
    sx = {},
    ...rest
}) {
    return (
        <MuiButton
            onClick={onClick}
            variant={variant}
            color={color}
            disabled={disabled}
            type={type}
            fullWidth={fullWidth}
            startIcon={startIcon}
            size={size}
            sx={sx}
            {...rest}
        >
            {children}
        </MuiButton>
    );
}
