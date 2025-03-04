import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Remplacez ces valeurs par celles de votre projet Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA5vaoYNz7IhD_Yl2i1Yjl0ISi3KEWOU50",
  authDomain: "route-1af57.firebaseapp.com",
  projectId: "route-1af57",
  storageBucket: "route-1af57.firebasestorage.app",
  messagingSenderId: "174430938900",
  appId: "1:174430938900:web:005df3b7f2f6d28435c401",
  measurementId: "G-RHY9PTN18H"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FirebaseAuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [idToken, setIdToken] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Connexion avec Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Récupérer l'ID Token
      const token = await user.getIdToken();
      setIdToken(token);
      console.log('ID Token:', token);

      // Faites quelque chose avec l'ID Token (ex: envoyer au serveur)
    } catch (err) {
      setError('Erreur de connexion: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>Se connecter</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Mot de passe"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ marginTop: 2 }}
        >
          {loading ? 'Chargement...' : 'Se connecter'}
        </Button>
      </form>
      {idToken && (
        <Typography variant="body2" color="success.main" sx={{ marginTop: 2 }}>
          ID Token récupéré avec succès! Consultez la console pour voir le token.
        </Typography>
      )}
    </Box>
  );
};

export default FirebaseAuthPage;
