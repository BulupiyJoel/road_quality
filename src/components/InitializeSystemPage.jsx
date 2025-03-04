import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Box, Paper, Button, ThemeProvider,CssBaseline,AppBar,Toolbar } from '@mui/material';
import axios from 'axios'; // Import axios
import { Link } from 'react-router-dom';
import theme from './theme';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5vaoYNz7IhD_Yl2i1Yjl0ISi3KEWOU50",
  authDomain: "route-1af57.firebaseapp.com",
  projectId: "route-1af57",
  storageBucket: "route-1af57.firebasestorage.app",
  messagingSenderId: "174430938900",
  appId: "1:174430938900:web:005df3b7f2f6d28435c401",
  measurementId: "G-RHY9PTN18H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

const InitSystem = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'route'));
        const dataArr = querySnapshot.docs.map(doc => doc.data());
        setData(dataArr);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchData();

    const unsubscribe = onSnapshot(collection(db, 'route'), snapshot => {
      const updatedData = snapshot.docs.map(doc => doc.data());
      setData(updatedData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Function to handle sending coordinates to the PHP file using axios
  const handleSaveCoordinates = async () => {
    const coordinates = data.map(item => ({
      lat: item.lat,
      lon: item.lon,
      timestamp: item.timestamp,
      trajet: item.trajet
    }));

    try {
      const response = await axios.post('/api/setCoords.php', { coordinates });
      console.log(response.data);
    } catch (error) {
      console.error('Error saving coordinates: ', error);
    }
  };

  return (
    <ThemeProvider theme={theme
    }>
    <CssBaseline />
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Qualité de Route
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{ textTransform: 'none', marginRight: 3 }}
        >
          Accueil
        </Button>
        <Button
          component={Link}
          to="/map"
          variant="contained"
          sx={{ textTransform: 'none', marginRight: 3 }}
        >
          Map
        </Button>
        <Button
          component={Link}
          to="/init-sys"
          variant="contained"
          sx={{ textTransform: 'none', marginRight: 3 }}
        >
          View Initialization system
        </Button>
      </Toolbar>
    </AppBar>
    <Container>
      <Typography variant="h4" gutterBottom>
        Firebase Data
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {data.map((item, index) => (
            <ListItem key={index}>
              <Paper elevation={3} style={{ padding: '16px', width: '100%' }}>
                <Typography variant="h6">Donnée</Typography>
                <ListItemText
                  primary={`Trajet: ${item.trajet}`}
                  secondary={
                    <div>
                      <div><strong>Latitude:</strong> {item.lat}</div>
                      <div><strong>Longitude:</strong> {item.lon}</div>
                    </div>
                  }
                />
              </Paper>
            </ListItem>
          ))}
        </List>
      )}

      <Button
        variant="contained"
        color="primary"
        onClick={handleSaveCoordinates}  // Save data to server
        style={{ marginTop: '20px' }}
      >
        Mis à jour coordonnée
      </Button>
    </Container>
    </ThemeProvider>
  );
};

export default InitSystem;
