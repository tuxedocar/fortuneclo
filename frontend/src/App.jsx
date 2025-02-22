import React from 'react';
import Layout from './components/layout/Layout';
import InventoryList from './components/inventory/InventoryList';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline, Container } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <BrowserRouter>
            <CssBaseline />
            <Layout pageTitle="Inventory Dashboard">
                <Container maxWidth="xl">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/inventory" element={<InventoryList />} />
                        {/* Add routes for Orders and Sales later if needed */}
                    </Routes>
                </Container>
            </Layout>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </BrowserRouter>
    );
}

export default App;