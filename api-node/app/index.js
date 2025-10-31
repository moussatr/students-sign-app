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
    secret: 'Secret12',
}
));

mongoose.connect(process.env.MONGO_URL,
    
 {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log('BD connect');
    }
})

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