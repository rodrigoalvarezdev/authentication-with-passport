const usersCtrl = {};
const Users = require('../models/user.models');
const passport = require('passport');


usersCtrl.renderSignUpForm = (req, res)=>{
    res.render('users/signup')
};

usersCtrl.signUp = async (req, res)=>{
    const {name, email, password, confirm_password} = req.body;
    const errors = [];
    if(password != confirm_password){
        errors.push({text: 'password do not match'});
    };
    if(password.length < 4){
        errors.push({text: 'password must be  al least 4 characters'});
    };
    if(errors.length > 0){
        res.render('users/signup', {
            errors,
            name: name,
            email: email
        })
    }else{
      const emailUser =  await Users.findOne({email: email});
      if(emailUser){
          req.flash('error_msg', 'the email is already in use');
          res.redirect('/users/signup')
      }else{
          const {name, email, password} = req.body;
        
          const newUser =  new Users({
              name: name, 
              email: email, 
              password: await Users.encriptPassword(password)
           });

         await newUser.save();
         req.flash('success_msg', 'you are register');
         res.redirect('/users/signin');
      };
    };
};

usersCtrl.renderSignInForm = (req, res)=>{
    res.render('users/signin');
};

usersCtrl.signIn = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
})

usersCtrl.logOut = (req, res)=>{
    req.logOut();
    req.flash('success message', 'you are logged out now');
    res.redirect('/users/signin')
};

module.exports = usersCtrl;