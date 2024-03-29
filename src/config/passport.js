const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user.models');

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done)=>{
  const user = await User.findOne({email});
  if(!user){
      return done(null, false, {message: 'not user found'});
  }else{
     const match = await User.comparePassword(password, user.password);
     if(match){
         return done(null, user);
     }else{
         return done(null, false, {message: 'inconrrect password'});
     }
  }
}));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    });
});