const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// const { Comment } = require("./models/comment")

const app = express();
const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
const JWTSECRET = process.env.JWTSECRET;

const GETprofileRouter = require("./controllers/GETprofile").router;
const GETuserRouter = require("./controllers/GETuser").router;
const GETarticlesRouter = require("./controllers/GETarticles").router;
const GETtagsRouter = require("./controllers/GETtags").router;
const GETslugRouter = require("./controllers/GETslug").router;
const POSTuserRouter = require("./controllers/POSTuser").router;
const POSTloginRouter = require("./controllers/POSTlogin").router;
const POSTarticlesRouter = require("./controllers/POSTarticles").router;
const POSTfavoriteRouter = require("./controllers/POSTfavorite").router;
const PUTuserRouter = require("./controllers/PUTuser").router;
const DELETEfavoriteRouter = require("./controllers/DELETEfavorite").router;
const PUTarticlesRouter = require("./controllers/PUTarticles").router;


app.use(express.static("dist"));
app.use(express.json());

app.use((req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, JWTSECRET);
  }
  next();
});

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use("/api", GETprofileRouter);
app.use("/api", GETuserRouter);
app.use("/api", GETarticlesRouter);
app.use("/api", GETtagsRouter);
app.use("/api", GETslugRouter);
app.use("/api", POSTuserRouter);
app.use("/api", POSTloginRouter);
app.use("/api", POSTarticlesRouter);
app.use("/api", PUTuserRouter);
app.use("/api", PUTarticlesRouter);
app.use("/api", DELETEfavoriteRouter);
app.use("/api", POSTfavoriteRouter);

mongoose.connect(MONGODB_URL);

app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});


//testABC