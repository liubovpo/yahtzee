import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import WelcomePage from "./pages/WelcomePage";
import GamePage from "./pages/GamePage";
import ScorePage from "./pages/ScorePage";
import { Toolbar } from "@mui/material";

function App() {
  return (
    <div>
      <AppBar position="fixed" sx={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', width: '100%',overflow:"hidden" }}>
        <Container maxWidth="xl">
          <Toolbar>
            <Button variant="contained" sx={{ backgroundColor:"white", color:'#fe6b8b', m: 2 }} href="/">
              New Game
            </Button>
            <Button variant="outlined" sx={{ m: 2, borderColor:"white", color:'white' }} href="/score">
              Score
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/score" element={<ScorePage />} />
      </Routes>
    </div>
  );
}

export default App;
