const helper = {};

helper.isAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
        
        return next();
    }
    req.flash('error_msg', 'not authorized')
    res.redirect('/users/signin');
}

module.exports = helper;