import React, { useState } from 'react';
import { Box, Container as MuiContainer } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import Menu from './Menu';

// Шаблон страницы. ЛР 2: разместить компоненты навигации на шаблоне.
// ЛР 3: использует Header, Footer, Menu, Content (children).
// ЛР 7: меню в виде Drawer вызывается из Header.
export default function Layout({ children }) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
            <Header onOpenMenu={() => setMenuOpen(true)} />
            <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
            <Box component="main" sx={{ flex: 1, py: 3, pb: { xs: 10, md: 3 } }}>
                <MuiContainer maxWidth="lg">{children}</MuiContainer>
            </Box>
            <Footer />
        </Box>
    );
}
