const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const {campgroundSchema, reviewSchema} = require('./schema');
const catchAsync =require('./utils/catchAsync');
const ExpressError =require('./utils/ExpressError');
const Campground = require('./models/campgrounds');
const methodOverride = require('method-override');
const Review = require('./models/review');

const { urlencoded } = require('express');
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true, already true on version 6+
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected!");
});

const app = express();


const validateCampground = (req,res,next) =>{
    const {error} = campgroundSchema.validate(req.body)
    const msg = error.details.map(el => el.message).join(',')
    if (error){
        throw new ExpressError(msg, 400)
    }
    else{
        next();
    }
}
const validateReview = (req,res,next) =>{
    const {error} = reviewSchema.validate(req.body)
    const msg = error.details.map(el => el.message).join(',')
    if (error){
        throw new ExpressError(msg, 400)
    }
    else{
        next();
    }
}




app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.render('home')
    // res.send("res function is working")
})
app.get('/campgrounds', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}))
app.post('/campgrounds', catchAsync(async (req, res) => {
    // if (!req.body.campground) throw new ExpressError("Invalid Campground Data.",400)
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
}))
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new')
})
app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground })
}))

app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate('reviews')
    res.render('campgrounds/show', { campground })
}))

app.put('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`);
}))
app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}))

// reviews
app.post('/campgrounds/:id/reviews', catchAsync(async(req,res)=>{
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}))
app.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async(req,res) => {
    const {id, reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);
}))


app.all('*',(req,res,next) => {
    next(new ExpressError('Page Not Found!', 404))
})
app.use((err,req,res,next) => {
    if (!err.message) err.message = "Oh No, Something went wrong!"
    const {statusCode = 500,message = "Something Went Wrong!"} = err;
    res.status(statusCode).render('error', {err});
})
app.listen(3000, () => {
    console.log("listening on port 3000!!");
})
