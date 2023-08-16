const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const UserRoute = require("./routes/UserRoutes");
const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use("/api/user", UserRoute);

app.listen(4000, () => {
  console.log("server is up and running");
});
