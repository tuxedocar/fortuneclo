// frontend/src/components/inventory/InventoryModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button,
    FormControl, InputLabel, Select, MenuItem, Box, FormHelperText
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import inventoryApi from '../../api/inventoryApi';

const InventoryModal = ({ open, onClose, onSave, item, categories }) => {
    const { handleSubmit, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            productName: '',
            description: '',
            price: '',
            stockQuantity: '',
            collectionID: '',
            size: '',
            color: '',
        },
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const imageInputRef = useRef(null);
    const [imagePreviews, setImagePreviews] = useState([]);

    useEffect(() => {
        if (item && item.imageUrls) {
            setImagePreviews(item.imageUrls);
            reset(item);
        } else {
            setImagePreviews([]);
            reset();
        }
    }, [item, reset, open]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('productName', data.productName);
            formData.append('description', data.description);
            formData.append('price', data.price);
            formData.append('stockQuantity', data.stockQuantity);
            formData.append('collectionID', data.collectionID);
            formData.append('size', data.size);
            formData.append('color', data.color);

            const imageFiles = imageInputRef.current.files;
            if (imageFiles) {
                for (let i = 0; i < imageFiles.length; i++) {
                    formData.append('images', imageFiles[i]);
                }
            }

            if (item) {
                await inventoryApi.updateInventoryItem(item._id, formData);
            } else {
                await inventoryApi.createInventoryItem(formData);
            }
            onSave();
            onClose();
        } catch (error) { // Changed err to error
            console.error("Error saving inventory item:", error);
            toast.error('Error saving inventory item: ' + error.message); // Added toast error
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newPreviews = [];
        files.forEach(file => {
            newPreviews.push(URL.createObjectURL(file));
        });
        setImagePreviews(newPreviews);
    };

    const handleCancel = () => {
        onClose();
        reset();
        setImagePreviews([]);
    };

    return (
        <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
            <DialogTitle>{item ? 'Edit Item' : 'Add New Item'}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="productName-label">Product Name</InputLabel>
                            <Controller
                                name="productName"
                                control={control}
                                rules={{ required: 'Product Name is required' }}
                                render={({ field }) => (
                                    <TextField label="Product Name" error={!!errors.productName} helperText={errors.productName?.message} {...field} />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="description-label">Description (Optional)</InputLabel>
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField label="Description (Optional)" multiline rows={3} {...field} />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="price-label">Price</InputLabel>
                            <Controller
                                name="price"
                                control={control}
                                rules={{ required: 'Price is required', pattern: /^\d+(\.\d{1,2})?$/ }}
                                render={({ field }) => (
                                    <TextField label="Price" type="number" error={!!errors.price} helperText={errors.price?.message} {...field} />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="stockQuantity-label">Quantity</InputLabel>
                            <Controller
                                name="stockQuantity"
                                control={control}
                                rules={{ required: 'Quantity is required', pattern: /^\d+$/ }}
                                render={({ field }) => (
                                    <TextField label="Quantity" type="number" error={!!errors.stockQuantity} helperText={errors.stockQuantity?.message} {...field} />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="collectionID-label">Category</InputLabel>
                            <Controller
                                name="collectionID"
                                control={control}
                                rules={{ required: 'Category is required' }}
                                render={({ field }) => (
                                    <Select labelId="collectionID-label" label="Category" error={!!errors.collectionID} {...field}>
                                        {categories.map((category) => (
                                            <MenuItem key={category._id} value={category.collectionID}>
                                                {category.collectionName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.collectionID && <FormHelperText error>{errors.collectionID.message}</FormHelperText>}
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="size-label">Size (Optional)</InputLabel>
                            <Controller
                                name="size"
                                control={control}
                                render={({ field }) => (
                                    <TextField label="Size (Optional)" {...field} />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="color-label">Color (Optional)</InputLabel>
                            <Controller
                                name="color"
                                control={control}
                                render={({ field }) => (
                                    <TextField label="Color (Optional)" {...field} />
                                )}
                            />
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel htmlFor="image-upload">Images (Optional, up to 5)</InputLabel>
                            <Button variant="outlined" component="label">
                                Upload Images
                                <input hidden type="file" multiple accept="image/*" onChange={handleImageChange} ref={imageInputRef} />
                            </Button>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1, gap: 1 }}>
                                {imagePreviews.map((previewUrl, index) => (
                                    <Box key={index} component="img" src={previewUrl} alt={`Preview ${index}`} sx={{ height: 100, width: 100, objectFit: 'cover' }} />
                                ))}
                            </Box>
                        </FormControl>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">Cancel</Button>
                    <Button type="submit" color="primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default InventoryModal;