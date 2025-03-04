import React, { useState } from 'react';
import { AppBar, Button, Container, CssBaseline, Grid, Typography, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

// Customized
import theme from './theme';
import { Link } from 'react-router-dom';

const HomePage = () => {
  // Local state to track initialization status
  const [initStatus, setInitStatus] = useState('');

  const initializeRq = async (event) => {
    event.preventDefault(); // Prevent the default action
    event.stopPropagation(); // Stop the event from bubbling up

    try {
      // Send the request to initialize the system
      const response = await axios.get("/api/setCoords.php");
      
      // Log the response to check if it succeeded
      console.info(response.data);
      
      // Set success message if successful
      setInitStatus('Système initialisé avec succès!');
    } catch (error) {
      // Handle error and update the status
      console.error(error);
      setInitStatus('Erreur lors de l\'initialisation du système.');
    }
  };

  const checkInitializeRq = async (event) => {
    event.preventDefault(); // Prevent the default action
    event.stopPropagation(); // Stop the event from bubbling up

    try {
      // Send the request to initialize the system
      const response = await axios.get("/api/getCoords.php");
      
      // Log the response to check if it succeeded
      console.log(response.data);
      
      // Set success message if successful
      setInitStatus(`Donneer : `);
    } catch (error) {
      // Handle error and update the status
      console.error(error);
      setInitStatus('Erreur lors de l\'initialisation du système.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Qualité de Route
          </Typography>
          
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
      
      <Container sx={{ marginTop: 5 }}>
        <Grid container spacing={3}>
          {/* Section Carte */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Carte
            </Typography>
            <Typography variant="body1" paragraph>
              Explorez la carte pour voir la qualité des routes dans différentes zones.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              href="/map" 
              sx={{ padding: 2 }}
            >
              Voir la Carte
            </Button>
          </Grid>

          {/* Section Visualisation des données */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Visualisation des Données
            </Typography>
            <Typography variant="body1" paragraph>
              Accédez aux graphiques et statistiques pour analyser la qualité des routes.
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              fullWidth 
              href="/data" 
              sx={{ padding: 2 }}
            >
              Voir les Données
            </Button>
          </Grid>
        </Grid>

        {/* Status Message */}
        {initStatus && (
          <Typography variant="body1" sx={{ marginTop: 2, textAlign: 'center' }}>
            {initStatus}
          </Typography>
        )}
      </Container>
      
      <footer style={{ textAlign: 'center', padding: '20px', marginTop: '40px' }}>
        <Typography variant="body2" color="textSecondary">
          &copy; 2025 Qualité de Route. Tous droits réservés.
        </Typography>
      </footer>
    </ThemeProvider>
  );
};

export default HomePage;
