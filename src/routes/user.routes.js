const {Router} = require('express');
const router = Router();
const usersCrl = require('../controllers/users.controllers');

router.get('/users/signup',usersCrl.renderSignUpForm);

router.post('/users/signup',usersCrl.signUp);

router.get('/users/signin',usersCrl.renderSignInForm);

router.post('/users/signin',usersCrl.signIn);

router.get('/users/logout',usersCrl.logOut);


module.exports = router;