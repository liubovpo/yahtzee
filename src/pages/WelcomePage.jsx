import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  List,
  ListItem,
  Typography,
  Container,
  Paper,
  Box,
} from "@mui/material";

const WelcomePage = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const navigate = useNavigate();

  const buttonStyle = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: '#ffffff',
  };

  let id = null

  const handleAddPlayer = () => {
    if (newPlayerName.trim() !== "") {
      setPlayers([...players,  { name: newPlayerName }]);
      setNewPlayerName("");
      console.log(players)
    }
  };

  const handleStartGame = () => {
    fetch(`${import.meta.env.VITE_API_URL}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(players.map(player => ({ name: player.name }))),
    })
      .then(response => response.json())
      .then(data => {
        console.log('API response:', data);
        id = data
        navigate(`/game/${id}`)
      })
      .catch(error => {
        console.error('Error posting player names to API:', error);
      });
    console.log("Game started with players:", players);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Container component="main" maxWidth="sm">
        <Paper elevation={3} style={{ padding: "20px", marginTop: "50px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Player List
          </Typography>
          <List>
            {players.map((player, index) => (
              <ListItem key={index}>
                <Typography>{`${index + 1}. ${player.name}`}</Typography>
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
              style={{ marginLeft: "10px", backgroundColor: '#fe6b8b'}}

            >
              +
            </Button>
          </Box>
          <Box display="flex" justifyContent="center" marginTop="20px">

              <Button
                variant="contained"
                color="primary"
                onClick={handleStartGame}
                style={buttonStyle}
              >
                Start Game
              </Button>

          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default WelcomePage;
