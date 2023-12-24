// In your `google-oAuth2-stratigity.js` file

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const User = require('../models/user');



passport.use(new GoogleStrategy({
  clientID: "203176037225-f0992pg7qae1tje8t3r1reu7op28359i.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:8000/user/auth/google/callback",
  passReqToCallback: true,

},
  async function (req, accessToken, refreshToken, profile, done) {
    try {
      
      const user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
     


        return done(null, user);
      } else {
        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString('hex')
        });

    
       
        return done(null, newUser);
      }
    } catch (err) {
      console.log('Error in Google strategy passport:', err);
      return done(err);
    }
  }
));


passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    console.log('Error in Google strategy passport:', err);
    done(err);
  }
});

module.exports = passport;
