const User = require('../models/user');

module.exports.renderRegister = (req,res)=>{
    res.render('users/register')
}

module.exports.register = async(req,res)=>{
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
}

module.exports.renderLogin = (req,res)=>{
    res.render('users/login');
}

module.exports.login = async(req,res)=>{
    req.flash('success','Welcome Back!');
    // keepSessionInfo:tru in passport authenticate to store the url
    const redirectUrl = req.session.returnTo || '/campgrounds'
    res.redirect(redirectUrl);
    delete req.session.returnTo;
}

module.exports.logout = (req,res,next)=>{
    // version 0.6.0 now, req.logout is asynchronous
    req.logout(function(err) {
        if (err) { return next(err); }    
    req.flash('success','logged You out!');
    res.redirect('/campgrounds');
})
}