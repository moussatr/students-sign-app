require('dotenv').config(); 
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
var cookieParser = require('cookie-parser');

const app = express();


app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'change_this_immediately',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set true if using HTTPS
}));

mongoose.set('strictQuery', false);

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URL;
if (!mongoUri) {
  console.error('ERROR: MONGODB_URI is not set. Add it to .env');
  process.exit(1);
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const classeRouter = require('./routes/classes');
const studentRouter = require('./routes/students');
const lessonRouter = require('./routes/lessons');
const presenceRouter = require('./routes/presences');
const sessionRouter = require('./routes/sessions');





app.get("/", (req, res) => {
    res.status(200).send('<h1>hello world !!</h1>')
});
app.use('/classes', classeRouter);
app.use('/students', studentRouter);
app.use('/lessons', lessonRouter);
app.use('/presences', presenceRouter);
app.use('/sessions', sessionRouter);




app.listen(4500, () => {
    console.log('Server is running on http://127.0.0.1:4500');
});