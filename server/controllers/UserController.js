const User = require("../models/UserModel");

const addToLikedMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
        return res.status(200).send({ msg: "movie added sucessfully" });
      } else {
        return res.status(409).send({ msg: "movie is already added" });
      }
    } else {
      await User.create({ email, likedMovies: [data] });

      res.json({
        msg: "movie added successfully",
      });
    }
  } catch (error) {
    return res.json({ msg: "error in adding movie" });
  }
};

const getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });

    if (user) {
      res.json({ msg: "sucess", movies: user.likedMovies });
    } else {
      return res.json({ msg: "user with given email is not found" });
    }
  } catch (error) {
    return res.json({ msg: "error in adding movie" });
  }
};

const removeFromLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const { likedMovies } = user;
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);
      if (movieIndex === null) {
        return res.status(400).send({ msg: "Movie not found" });
      }
      likedMovies.splice(movieIndex, 1);

      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies,
        },
        { new: true }
      );
      return res.json({
        msg: "movie deleted sucessfully",
        movies: likedMovies,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ msg: "error deleting movie" });
  }
};

module.exports = {
  addToLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
};
