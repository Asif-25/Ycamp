const express = require("express");
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const catchAsync =require('../utils/catchAsync');
const ExpressError =require('../utils/ExpressError');

router.get('/register', (req,res)=>{
    res.render('users/register')
})

router.post('/register', catchAsync(async(req,res)=>{
    try{
    const {email,username,password} = req.body;
    const user = new User({email,username});
    const registeredUser = await User.register(user,password);
    req.login(registeredUser, err =>{
        if(err){return next(err);}
        req.flash('success','Welcome to Yelp Camp!');
        res.redirect('/campgrounds');
    })
    }
    catch(e){
        req.flash('error',e.message);
        res.redirect('/register');
    }
}))

router.get('/login', (req,res)=>{
    res.render('users/login');
})
router.post('/login',passport.authenticate('local', {failureFlash:true, failureRedirect:'/login',keepSessionInfo:true}), catchAsync(async(req,res)=>{
    req.flash('success','Welcome Back!');
    // keepSessionInfo:tru in passport authenticate to store the url
    const redirectUrl = req.session.returnTo || '/campgrounds'
    res.redirect(redirectUrl);
    delete req.session.returnTo;
}))

// version 0.6.0 now, req.logout is asynchronous
router.get('/logout', (req,res,next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }    
    req.flash('success','logged You out!');
    res.redirect('/campgrounds');
})
})


module.exports = router;
