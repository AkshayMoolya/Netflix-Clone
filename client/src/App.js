import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Netflix from "./pages/Netflix";
import Player from "./pages/Player";
import Movie from "./pages/Movie";
import TvShow from "./pages/TvShow";
import UserListedMovies from "./pages/UserListedMovies";
import SearchPage from "./pages/SearchPage";
import Splash from "./pages/Splash";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Netflix />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/player" element={<Player />} />
        <Route exact path="/movies" element={<Movie />} />
        <Route exact path="/mylist" element={<UserListedMovies />} />
        <Route exact path="/tvshows" element={<TvShow />} />
        <Route exact path="/search/:SearchTerm" element={<SearchPage />} />
        <Route exact path="/splash" element={<Splash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
