var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const db = require('../models');
const { v4: uuidv4 } = require ('uuid');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/v1/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log("profile", profile);
    const oauth_token = uuidv4();
    profile.oauth_token = oauth_token;
    let response = db.OauthUser.findOrCreate({ 
      where: {id: profile.id},
      defaults: {
        id: profile.id,
        oauth_email: profile.emails[0]?.value,
        oauth_type: profile?.provider,
        oauth_fullname: profile?.displayName,
        oauth_avatarUrl: profile?.photos[0]?.value,
        oauth_token
      } 
    });

    if(!response[1]) {
      db.OauthUser.update(
        { oauth_token }, 
        { where: { 
            id: profile.id 
        } 
      });
    }

    return cb(null, profile);
  }
));