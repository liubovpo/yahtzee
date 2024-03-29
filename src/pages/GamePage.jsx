import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";

const categories = [
  "Ones",
  "Twos",
  "Threes",
  "Fours",
  "Fives",
  "Sixes",
  "3 of a Kind",
  "4 of a Kind",
  "Full House",
  "Small Straight",
  "Large Straight",
  "Yahtzee",
  "Chance",
];

const fixedPointCategories = [
  "Full House",
  "Large Straight",
  "Small Straight",
  "Yahtzee",
];

const fixedPoints = {
  "Full House": 25,
  "Large Straight": 40,
  "Small Straight": 30,
  Yahtzee: 50,
};

const GamePage = () => {
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState({});
  const [confirmedScores, setConfirmedScores] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/game/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPlayers(data.map((player) => player.name));
      })
      .catch((error) => console.log(error));
  }, []);

  const buttonStyle = {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    color: "#ffffff",
  };

  const handleScoreConfirmation = (category, playerName, score) => {
    if (score !== "") {
      setScores((prevScores) => ({
        ...prevScores,
        [playerName]: { ...(prevScores[playerName] || {}), [category]: score },
      }));

      setConfirmedScores({
        ...confirmedScores,
        [playerName]: {
          ...(confirmedScores[playerName] || {}),
          [category]: true,
        },
      });
    }
    console.log(scores);
  };

  const handleScoreCount = () => {
    const totalScores = players.map((player) => {
      return categories.reduce(
        (total, category) => total + Number(scores[player]?.[category] || 0),
        0
      );
    });

    return totalScores;
  };

  const areAllCategoriesConfirmed = (player) => {
    return categories.every((category) => confirmedScores[player]?.[category]);
  };

  return (
    <Container sx={{ mt: 10 }}>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Categories</TableCell>
              {players.map((player, playerIndex) => (
                <TableCell
                  sx={{ fontWeight: "bold" }}
                  key={playerIndex}
                  align="center"
                >
                  {player}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {/* <TableCell sx={{ fontWeight: "bold" }}>Total</TableCell>
              {players.map((player, playerIndex) => (
                <TableCell
                  sx={{ fontWeight: "bold" }}
                  key={playerIndex}
                  align="center"
                >
                  {categories.reduce(
                    (total, category) =>
                      total + (scores[player]?.[category] || 0),
                    0
                  )}
                </TableCell>
              ))} */}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, categoryIndex) => (
              <TableRow key={categoryIndex}>
                <TableCell>{category}</TableCell>
                {players.map((player, playerIndex) => {
                  const isFixedCategory =
                    fixedPointCategories.includes(category);
                  const isScoreConfirmed =
                    confirmedScores[player] &&
                    confirmedScores[player][category];

                  const inputValue = scores[player]?.[category] || "";

                  return (
                    <TableCell key={playerIndex}>
                      {isFixedCategory ? (
                        <>
                          <Button
                            variant="contained"
                            disabled={isScoreConfirmed}
                            onClick={() =>
                              handleScoreConfirmation(
                                category,
                                player,
                                fixedPoints[category]
                              )
                            }
                          >
                            Got it ({fixedPoints[category]} pt)
                          </Button>
                          <Button
                            sx={{ ml: 2 }}
                            variant="contained"
                            disabled={isScoreConfirmed}
                            onClick={() =>
                              handleScoreConfirmation(category, player, 0)
                            }
                          >
                            0 pt
                          </Button>
                        </>
                      ) : (
                        <>
                          {isScoreConfirmed ? (
                            <Typography variant="body1">
                              {scores[player]?.[category]}
                            </Typography>
                          ) : (
                            <>
                              <TextField
                                id="filled-start-adornment"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      pt
                                    </InputAdornment>
                                  ),
                                }}
                                variant="outlined"
                                value={inputValue}
                                type="number"
                                style={{ marginRight: "10px" }}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setScores((prevScores) => ({
                                    ...prevScores,
                                    [player]: {
                                      ...(prevScores[player] || {}),
                                      [category]: value,
                                    },
                                  }));
                                }}
                              />
                              <Button
                                variant="contained"
                                style={buttonStyle}
                                onClick={() =>
                                  handleScoreConfirmation(
                                    category,
                                    player,
                                    inputValue
                                  )
                                }
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
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        disabled={!players.every((player) => areAllCategoriesConfirmed(player))}
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => console.log(handleScoreCount())}
      >
        Count
      </Button>
    </Container>
  );
};

export default GamePage;
