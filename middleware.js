module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.session.returnMethod = req.originalMethod;
        req.flash('error', "You must be signed in!");
        return res.redirect('/login');
    }
    next();
}
