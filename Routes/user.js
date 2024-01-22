const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const user_controller = require('../Controllers/user_controller');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const jwtSecret="fdbfdnbfddsvsdvvdvdvsvvsvddsbsfbfdbd"

router.post('/signUp', [body('email').isEmail(), body('password', 'incorrect password').isLength({ min: 5 })], user_controller.signUp);
router.post('/signIn', [body('email').isEmail()], user_controller.signIn);
router.post('/giveUsers', user_controller.giveUsers);
router.post('/getUser', user_controller.getUser);
router.post('/getNoOfAll',user_controller.getNoOfAll);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {   
    const data = {
      user: {
        id: "123"
      }
    };
    const authToken = jwt.sign(data, jwtSecret);

    const userEmail = req.user.email; 

   
    const oneWeekInSeconds = 7 * 24 * 60 * 60;
    res.cookie('authToken', authToken, { maxAge: oneWeekInSeconds * 1000 });
    res.cookie('userEmail', userEmail, { maxAge: oneWeekInSeconds * 1000 });
    res.redirect('http://localhost:3000');
  });

module.exports = router;
