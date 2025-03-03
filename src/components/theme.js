import { createTheme } from "@mui/material";
// Création d'un thème personnalisé avec la couleur verte
const theme = createTheme({
    palette: {
      primary: {
        main: '#388e3c', // couleur verte
      },
      secondary: {
        main: '#81c784', // couleur secondaire verte clair
      },
    },
  });

  export default theme