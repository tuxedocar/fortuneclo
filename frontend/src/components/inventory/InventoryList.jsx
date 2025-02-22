// frontend/src/components/inventory/InventoryList.jsx
import React, { useState, useEffect } from 'react';
import inventoryApi from '../../api/inventoryApi';
import InventoryModal from './InventoryModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import Layout from '../layout/Layout';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    IconButton, TextField, Select, MenuItem, Pagination, Box, Button, InputAdornment,
    CircularProgress, Avatar
} from '@mui/material';
import { Edit, Delete, Search as SearchIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ITEMS_PER_PAGE = 5;

const InventoryList = () => {
    const [inventoryItems, setInventoryItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [itemToDeleteId, setItemToDeleteId] = useState(null);
    const [itemToEdit, setItemToEdit] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchInventory();
        fetchCategories();
    }, [currentPage, searchQuery, categoryFilter, sortBy, sortOrder]);

    const fetchInventory = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                page: currentPage,
                limit: ITEMS_PER_PAGE,
                q: searchQuery,
                category: categoryFilter,
                _sort: sortBy,
                _order: sortOrder,
            };
            const data = await inventoryApi.getInventoryItems(params);
            setInventoryItems(data.items);
            setTotalPages(data.totalPages);
        } catch (error) { // Changed err to error
            setError(error.message || 'Failed to fetch inventory items.');
            toast.error('Failed to load inventory items.');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await inventoryApi.getCollections();
            setCategories(data.collections); // Assuming API returns { collections: [] }
        } catch (error) { // Changed err to error
            console.error("Error fetching categories:", error);
            toast.error('Failed to load categories.');
        }
    };

    const handleAddItem = () => {
        setItemToEdit(null);
        setIsModalOpen(true);
    };

    const handleEditItem = (item) => {
        setItemToEdit(item);
        setIsModalOpen(true);
    };

    const handleDeleteItem = (productId) => {
        setItemToDeleteId(productId);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteItem = async () => {
        setIsDeleteModalOpen(false);
        setLoading(true);
        setError(null);
        try {
            await inventoryApi.deleteInventoryItem(itemToDeleteId);
            toast.success('Item deleted successfully!');
            fetchInventory();
        } catch (error) { // Changed err to error
            setError(error.message || 'Failed to delete item.');
            toast.error('Failed to delete item.');
        } finally {
            setLoading(false);
        }
    };

    const cancelDeleteItem = () => {
        setIsDeleteModalOpen(false);
        setItemToDeleteId(null);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setItemToEdit(null);
    };

    const handleItemSaved = () => {
        setIsModalOpen(false);
        fetchInventory();
        toast.success('Item saved successfully!');
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    };

    const handleCategoryFilterChange = (event) => {
        setCategoryFilter(event.target.value);
        setCurrentPage(1);
    };

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}><CircularProgress /></Box>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Layout pageTitle="Inventory Dashboard">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Button variant="contained" color="primary" onClick={handleAddItem}>
                    Add Item
                </Button>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                        label="Search Item"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Select
                        value={categoryFilter}
                        onChange={handleCategoryFilterChange}
                        displayEmpty
                        size="small"
                    >
                        <MenuItem value="">
                            <em>All Categories</em>
                        </MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category._id} value={category.collectionID}>
                                {category.collectionName}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            </Box>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="inventory table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell onClick={() => handleSort('productName')} style={{ cursor: 'pointer' }}>
                                Item Name {sortBy === 'productName' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </TableCell>
                            <TableCell onClick={() => handleSort('description')} style={{ cursor: 'pointer' }}>
                                Description {sortBy === 'description' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </TableCell>
                            <TableCell onClick={() => handleSort('price')} align="right" style={{ cursor: 'pointer' }}>
                                Price {sortBy === 'price' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </TableCell>
                            <TableCell onClick={() => handleSort('stockQuantity')} align="right" style={{ cursor: 'pointer' }}>
                                Quantity {sortBy === 'stockQuantity' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </TableCell>
                            <TableCell onClick={() => handleSort('collectionID')} style={{ cursor: 'pointer' }}>
                                Category {sortBy === 'collectionID' && (sortOrder === 'asc' ? '▲' : '▼')}
                            </TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {inventoryItems.map((item) => (
                            <TableRow key={item._id} hover>
                                <TableCell>
                                    {item.imageUrls && item.imageUrls.length > 0 ? (
                                        <Avatar src={item.imageUrls[0]} alt={item.productName} variant="rounded" />
                                    ) : (
                                        '-'
                                    )}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.productName}
                                </TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell align="right">${item.price}</TableCell>
                                <TableCell align="right">{item.stockQuantity}</TableCell>
                                <TableCell>{categories.find(cat => cat.collectionID === item.collectionID)?.collectionName || 'Unknown'}</TableCell>
                                <TableCell align="center">
                                    <IconButton aria-label="edit" onClick={() => handleEditItem(item)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => handleDeleteItem(item._id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {inventoryItems.length === 0 && !loading && (
                            <TableRow>
                                <TableCell colSpan={7} align="center">No items found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Box>
                )}

                <InventoryModal
                    open={isModalOpen}
                    onClose={handleModalClose}
                    onSave={handleItemSaved}
                    item={itemToEdit}
                    categories={categories}
                />
                <DeleteConfirmationModal
                    open={isDeleteModalOpen}
                    onClose={cancelDeleteItem}
                    onConfirm={confirmDeleteItem}
                    itemName={inventoryItems.find(item => item._id === itemToDeleteId)?.productName}
                />
                <toast.ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            </Layout>
        );
    };

    export default InventoryList;