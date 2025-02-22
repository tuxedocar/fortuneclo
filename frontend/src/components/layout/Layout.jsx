// frontend/src/components/layout/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Box, Typography, Toolbar } from '@mui/material';

const Layout = ({ children, pageTitle }) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%', backgroundColor: '#f0f2f5' }}>
                <Navbar />
                <Toolbar />
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h5" fontWeight="bold" >
                        {pageTitle}
                    </Typography>
                </Box>
                <Box sx={{ mt: 1 }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;