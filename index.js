const express = require("express");
const envConfig = {
  path: process.env.NODE_ENV === "production" ? "prod.env" : ".env",
};
require("dotenv").config(envConfig);
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const userRoutes = require("./routes/user");
const caseRoutes = require("./routes/cases")
const session = require("express-session");
const path = require("path");
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
const cookieParser = require("cookie-parser");


mongoose.connect(process.env.MONGO_URI, (err) => {
  
    if (err) throw err;
    console.log("Connected to MongoDB");
});


app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server started at port ${process.env.PORT} `)
})

//passport Setup
app.use(cookieParser(process.env.SECRET_KEY));
app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: true,
      saveUninitialized: true,
    })
  );
app.use(passport.initialize());
app.use(passport.session());


app.use(userRoutes);
app.use(caseRoutes);

// Production Setup _ Deployment
if (process.env.NODE_ENV === "production") {
  console.log("prod");
  
  app.use(express.static(path.resolve(__dirname, "client","build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
  });

  process.on("uncaughtException", (err, promise) => {
    console.log(`Error: ${err.message}`);
  });
}
