// frontend/src/components/layout/Sidebar.jsx
import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, Box, Typography, Divider } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    ListAlt as ListingsIcon,
    Inventory2 as InventoryIcon,
    ShoppingCart as OrdersIcon,
    Payment as PaymentsIcon,
    LocalShipping as ShipmentsIcon,
    Lan as SalesChannelsIcon,
    Assessment as ReportsIcon,
    NotificationsNone as NotificationsIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Logo from '../../assets/ventorio-logo.svg'; // Assuming you have a logo SVG

const drawerWidth = 260;

const Sidebar = () => {
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                        boxSizing: 'border-box',
                        backgroundColor: '#f8f9fa',
                        borderRight: 'none',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 2 }}>
                    <Box sx={{ mb: 3, mt: 1 }}>
                        <img src={Logo} alt="Ventorio Logo" width="120" />
                    </Box>
                    <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2, fontWeight: 'bold' }}>
                        MAIN
                    </Typography>
                </Toolbar>
                <Divider />
                <List>
                    <ListItem button key="Dashboard" component={Link} to="/" sx={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItem>

                    <ListItem button key="Listings" component={Link} to="/listings" sx={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <ListingsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Listings" />
                    </ListItem>

                    <ListItem button key="Inventory" component={Link} to="/inventory" selected sx={{ backgroundColor: 'rgba(0, 0, 0, 0.08)', paddingTop: 1.5, paddingBottom: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <InventoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inventory" />
                    </ListItem>

                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle2" color="textSecondary" sx={{ px: 2, mt: 1, fontWeight: 'bold' }}>
                        SALES
                    </Typography>

                    <ListItem button key="Orders" component={Link} to="/orders" sx={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <OrdersIcon />
                        </ListItemIcon>
                        <ListItemText primary="Orders" />
                    </ListItem>

                    <ListItem button key="Payments" component={Link} to="/payments" sx={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <PaymentsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Payments" />
                    </ListItem>

                    <ListItem button key="Shipments" component={Link} to="/shipments" sx={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <ShipmentsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Shipments" />
                    </ListItem>

                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle2" color="textSecondary" sx={{ px: 2, mt: 1, fontWeight: 'bold' }}>
                        MARKETING
                    </Typography>

                    <ListItem button key="Sales Channels" component={Link} to="/sales-channels" sx={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <SalesChannelsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sales Channels" />
                    </ListItem>

                    <Divider sx={{ my: 1 }} />
                    <Typography variant="subtitle2" color="textSecondary" sx={{ px: 2, mt: 1, fontWeight: 'bold' }}>
                        OTHERS
                    </Typography>

                    <ListItem button key="Reports" component={Link} to="/reports" sx={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <ReportsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Reports" />
                    </ListItem>

                    <ListItem button key="Notifications" component={Link} to="/notifications" sx={{ paddingTop: 1.5, paddingBottom: 1.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                            <NotificationsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Notifications" />
                    </ListItem>
                </List>
            </Drawer>
        );
    };

    export default Sidebar;