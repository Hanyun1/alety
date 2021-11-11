const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash-plus");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

dotenv.config();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

//login configure
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());

app.use(passport.session());
app.use(flash());
app.use(cookieParser(process.env.SECRET));

require("./passport")(passport);
app.use(express.urlencoded({ extended: true }));

// parse incoming and outgoing request. Body parser activated
app.use(express.json());

//the server
app.use("/api/user", require("./routes/users"));
app.use("/api/signin", require("./routes/auth"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/event", require("./routes/event"));
app.use("/api/email", require("./routes/email"));
app.listen(4000 || process.env.PORT, () => console.log(`server is listening on port 4000!`));

module.exports = app;
