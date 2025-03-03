import React, { useEffect, useState } from "react";
import { AppBar, CssBaseline, Toolbar, Button, ThemeProvider, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Typography, Chip } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

//Customized
import theme from "./theme";

const DataPage = () => {
  // États pour les données, le chargement et les erreurs
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  // Indicateur de chargement
  const [error, setError] = useState(null);  // Pour gérer les erreurs

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Requête API
        const response = await axios.get("/api/getData.php");
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        // Gérer les erreurs de la requête
        console.error("Erreur lors du chargement des données : ", error);
        setError("Une erreur est survenue lors du chargement des données.");
      } finally {
        // Quand les données sont chargées ou en cas d'erreur, arrêter le chargement
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fonction pour déterminer la couleur du chip (pill)
  const getChipColor = (avg_vibration) => {
    if (avg_vibration > 15) return "error";  // Critique : rouge
    if (avg_vibration > 10) return "warning"; // Mauvais : orange
    if (avg_vibration > 5) return "warning";  // Moyen : jaune
    return "success"; // Bon : vert
  };

  // Fonction pour générer l'observation basée sur la vibration
  const getObservation = (avg_vibration) => {
    if (avg_vibration > 15) return "Route en très mauvais état (CRITIQUE)";
    if (avg_vibration > 10) return "Route en mauvais état (MAUVAISE)";
    if (avg_vibration > 5) return "Route en état moyen";
    return "Route en bon état";
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

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
            to="/"
            variant="contained"
            sx={{ textTransform: 'none' ,marginRight : 3}}
          >
            Acceuil
          </Button>
          <Button
            component={Link}
            to="/map"
            variant="contained"
            sx={{ textTransform: 'none' }}
          >
            Voir la Carte
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4">Classifications des datas</Typography>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Trajet</TableCell>
                <TableCell align="right">Oscillation(moyenne)</TableCell>
                <TableCell align="right">Observation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>{row.trajet}</TableCell>
                  <TableCell align="right">{row.avg_vibration}</TableCell>
                  <TableCell align="right">
                    <Chip
                      label={getObservation(row.avg_vibration)}
                      color={getChipColor(row.avg_vibration)}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
};

export default DataPage;
