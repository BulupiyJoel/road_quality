import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import Chart from './Chart';

const Dashboard = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Example Card */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6">Card Title</Typography>
            <Typography>Card Content</Typography>
          </Paper>
          <Chart/>
        </Grid>
        {/* Add more cards as needed */}
      </Grid>
    </Container>
  );
};

export default Dashboard;