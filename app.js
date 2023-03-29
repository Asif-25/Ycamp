const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const catchAsync =require('./utils/catchAsync');
const ExpressError =require('./utils/ExpressError');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');
const methodOverride = require('method-override');

const { urlencoded } = require('express');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // notaplicable for version 6+ mongoose
    // useFindAndModify: false,
    // useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected!");
});

const app = express();

app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: "this should be a better secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly:true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7,
    }

}
app.use(session(sessionConfig));
app.use(flash());

app.use((req,res,next)=>{
   res.locals.success = req.flash('success');
   res.locals.error = req.flash('error');
   next();
})

app.get('/', (req, res) => {
    res.render('home')
    // res.send("res function is working")
})

//campgrounds
app.use('/campgrounds',campgroundRoutes);

// reviews
app.use('/campgrounds/:id/reviews',reviewRoutes)

//if nothing is hit throw error
app.all('*',(req,res,next) => {
    next(new ExpressError('Page Not Found!', 404))
})
app.use((err,req,res,next) => {
    if (!err.message) err.message = "Oh No, Something went wrong!"
    const {statusCode = 500,message = "Something Went Wrong!"} = err;
    res.status(statusCode).render('error', {err});
})

//listening on port 3000
app.listen(3000, () => {
    console.log("listening on port 3000!!");
})
