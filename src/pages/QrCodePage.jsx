import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Alert, Box, Card, CardContent, CircularProgress } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const QrCodeVerification = () => {
    const [distributorId, setDistributorId] = useState('');
    const [orderId, setOrderId] = useState('');
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [qrCodeData, setQrCodeData] = useState(null);
    const [loading, setLoading] = useState(false);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLatitude(latitude);
                    setLongitude(longitude);
                    setLocation(`${latitude}, ${longitude}`);
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setError('Unable to retrieve location.');
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleVerify = async () => {
        if (!distributorId || !orderId || !location) {
            setError('Please fill in all fields and ensure location is available.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.put('https://med-tech-server.onrender.com/api/manufacturers/qrcode/qrcodes/scan', {
                distributorId,
                orderId,
                location,
            });

            setQrCodeData(response.data);

            if (response.data.message === "QR Code updated successfully" && image) {
                const formData = new FormData();
                formData.append('image', image);

                const imageResponse = await axios.post('https://med-gem.onrender.com/analyze', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                console.log('Image analysis response:', imageResponse.data);
            } else {
                setError('Please upload an image for analysis.');
            }
        } catch (err) {
            setError('Error verifying QR code or uploading image.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Verify QR Code
                    </Typography>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    <Box component="form" noValidate autoComplete="off">
                        <TextField
                            label="Distributor ID"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={distributorId}
                            onChange={(e) => setDistributorId(e.target.value)}
                        />
                        <TextField
                            label="Order ID"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                        />
                        <TextField
                            label="Location"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={location}
                            InputProps={{ readOnly: true }}
                        />
                        <Button
                            variant="contained"
                            component="label"
                            startIcon={<PhotoCamera />}
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageUpload}
                            />
                        </Button>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleVerify}
                                disabled={loading}
                                sx={{ mt: 2 }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Verify'}
                            </Button>
                        </Box>
                    </Box>

                    {latitude && longitude && (
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h6">Location Map:</Typography>
                            <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
                                <TileLayer
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <Marker position={[latitude, longitude]}>
                                    <Popup>
                                        Your location: {latitude}, {longitude}
                                    </Popup>
                                </Marker>
                            </MapContainer>
                        </Box>
                    )}

                    {qrCodeData && (
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h6">QR Code Data:</Typography>
                            <pre>{JSON.stringify(qrCodeData, null, 2)}</pre>
                        </Box>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default QrCodeVerification;

