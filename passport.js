const express = require("express")
const app = express()
const passport = require("passport")


require("dotenv").config()
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID:    "628738368099-shlvisbo69o6m3q5i1nqh5qqoqvqcd42.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {

    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      // return done(err, user);
    // });
    console.log(profile);
    done(null,profile)
  }
));


app.get('/',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        session:false,
        failureRedirect: '/auth/google/failure'
}));

app.get("/auth/google/success",(req,res)=>{
  // console.log(req);
  res.send("ok")
})
app.get("/auth/google/failure",(req,res)=>{
  res.send("done")
})
app.listen(5000)
