// frontend/src/api/inventoryApi.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Backend URL

const inventoryApi = {
    getInventoryItems: async (params) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/inventory`, { params });
            return response.data;
        } catch (error) {
            console.error("Error fetching inventory items:", error);
            throw error;
        }
    },
    getInventoryItemById: async (productId) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/inventory/${productId}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching inventory item by ID:", error);
            throw error;
        }
    },
    createInventoryItem: async (itemData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/inventory`, itemData);
            return response.data;
        } catch (error) {
            console.error("Error creating inventory item:", error);
            throw error;
        }
    },
    updateInventoryItem: async (productId, itemData) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/inventory/${productId}`, itemData);
            return response.data;
        } catch (error) {
            console.error("Error updating inventory item:", error);
            throw error;
        }
    },
    deleteInventoryItem: async (productId) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/inventory/${productId}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting inventory item:", error);
            throw error;
        }
    },
    getCollections: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/collections`);
            return response.data;
        } catch (error) {
            console.error("Error fetching collections:", error);
            throw error;
        }
    }
};

export default inventoryApi;