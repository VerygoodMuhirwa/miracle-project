const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const connectDB = require('./config/db');
const session = require("express-session")
const app = express();
dotenv.config();
const strat = require("./middlewares/auth/passport-linkedin");
const passport = require("passport");   
connectDB();
app.use(session({ secret: "verygoodmuhirwa" }));
app.use(passport.session());
app.use(passport.initialize());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use("/auth", require("./routes/linkedin"));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/profile', profileRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
    console.log(`Server is running on port: ${PORT}`)
);
