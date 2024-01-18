import React, { useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

const categories = [
  'Ones',
  'Twos',
  'Threes',
  'Fours',
  'Fives',
  'Sixes',
  '3 of a Kind',
  '4 of a Kind',
  'Full House',
  'Small Straight',
  'Large Straight',
  'Yahtzee',
  'Chance',
];

const fixedPointCategories = ['Full House', 'Large Straight', 'Small Straight', 'Yahtzee'];

const fixedPoints = {
  'Full House': 25,
  'Large Straight': 40,
  'Small Straight': 30,
  'Yahtzee': 50,
};

const GamePage = () => {
  const [players, setPlayers] = useState(['liuba', 'andreas', 'shitty']); // Add more players as needed
  const [scores, setScores] = useState({});
  const [confirmedScores, setConfirmedScores] = useState({});

  const handleScoreConfirmation = (category, playerName, score) => {
    if (score !== '') {
      setScores((prevScores) => ({
        ...prevScores,
        [playerName]: { ...(prevScores[playerName] || {}), [category]: score },
      }));

      setConfirmedScores({
        ...confirmedScores,
        [playerName]: { ...(confirmedScores[playerName] || {}), [category]: true },
      });
    }
    console.log(scores);
  };

  return (
    <Container sx={{ m: 10 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Categories</TableCell>
              {players.map((player, playerIndex) => (
                <TableCell key={playerIndex} align="center">
                  {player}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, categoryIndex) => (
              <TableRow key={categoryIndex}>
                <TableCell>{category}</TableCell>
                {players.map((player, playerIndex) => {
                  const isFixedCategory = fixedPointCategories.includes(category);
                  const isScoreConfirmed =
                    confirmedScores[player] && confirmedScores[player][category];

                  const inputValue = scores[player]?.[category] || '';

                  return (
                    <TableCell key={playerIndex}>
                      {isFixedCategory ? (
                        <Button
                          variant="contained"
                          color="primary"
                          disabled={isScoreConfirmed}
                          onClick={() => handleScoreConfirmation(category, player, fixedPoints[category])}
                        >
                          Got it ({fixedPoints[category]} pt)
                        </Button>
                      ) : (
                        <>
                          {isScoreConfirmed ? (
                            <Typography variant="body1">{scores[player]?.[category]}</Typography>
                          ) : (
                            <>
                              <TextField
                                id="filled-start-adornment"
                                InputProps={{
                                  endAdornment: <InputAdornment position="end">pt</InputAdornment>,
                                }}
                                variant="outlined"
                                value={inputValue}
                                onChange={(e) => {
                                  const value = parseInt(e.target.value, 10) || 0;
                                  setScores((prevScores) => ({
                                    ...prevScores,
                                    [player]: { ...(prevScores[player] || {}), [category]: value },
                                  }));
                                }}
                              />
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleScoreConfirmation(category, player, inputValue)}
                                style={{ marginLeft: '10px' }}
                              >
                                Confirm
                              </Button>
                            </>
                          )}
                        </>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
            <TableRow>
              <TableCell>Total</TableCell>
              {players.map((player, playerIndex) => (
                <TableCell key={playerIndex}>
                  {categories.reduce((total, category) => total + (scores[player]?.[category] || 0), 0)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default GamePage;
