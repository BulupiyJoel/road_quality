import React from 'react';
import { AppBar, Button, Container, CssBaseline, Grid, Typography, Toolbar } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

//Customized
import theme from './theme';

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Qualité de Route
          </Typography>
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
      </Container>
      
      <footer style={{ textAlign: 'center', padding: '20px', marginTop: '40px' }}>
        <Typography variant="body2" color="textSecondary">
          &copy; 2025 Qualité de Route. Tous droits réservés.
        </Typography>
      </footer>
    </ThemeProvider>
  );
}

export default HomePage;
