import React, { useState } from 'react';
import { Link} from "react-router-dom";
import {
  TextField,
  Button,
  List,
  ListItem,
  Typography,
  Container,
  Paper,
  Box,
} from '@mui/material';

const WelcomePage = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (newPlayerName.trim() !== '') {
      setPlayers([...players, newPlayerName]);
      setNewPlayerName('');
    }
  };

  const handleStartGame = () => {

    console.log('Game started with players:', players);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '50px' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Player List
        </Typography>
        <List>
          {players.map((player, index) => (
            <ListItem key={index}>
              <Typography>{`${index + 1}. ${player}`}</Typography>
            </ListItem>
          ))}
        </List>
        <Box display="flex" alignItems="center">
          <TextField
            label="Enter player name"
            variant="outlined"
            fullWidth
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddPlayer}
            style={{ marginLeft: '10px' }}
          >
            +
          </Button>
        </Box>
        <Box display="flex" justifyContent="center" marginTop="20px">
          <Link to='/game'>
            <Button variant="contained" color="primary" onClick={handleStartGame}>
              Start Game
            </Button>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
};

export default WelcomePage;