const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const LocalStrategy = require('passport-local').Strategy;

// call modle account database
const dbAcount = require('../modles/Account');

// call constant parameters
const PARAMTERS = require('./../constants/parameterConstant');

var checkLoginSocialNetwork = (profile, done) => {
    
}

// passport local
passport.use(new LocalStrategy({
        passReqToCallback: true
    },
    (req, username, password, done) => {
        console.log(username +' - '+ password);
        console.log("chạy");
        dbAcount.findOne({username}, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false, req.flash('message', 'Not found acount'));
            if (!user.validPassword(password, user.password))   // if password is invalid
                return done(null, false, req.flash('message', 'Wrong password'));

            return done(null, user);
        });
    }
));

// passport Facebook
passport.use(new FacebookStrategy(
    {
        clientID: PARAMTERS.FACEBOOK_ID,
        clientSecret: PARAMTERS.FACEBOOK_SECRET,
        callbackURL: PARAMTERS.FACEBOOK_CALLBACK_URL,
        profileFields: ['email', 'gender', 'locale', 'displayName']
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(`Facebook:`);
        console.log(profile);
        checkLoginSocialNetwork(profile, done);
    }
));

// passport Google
passport.use(new GoogleStrategy(
    {
        clientID: PARAMTERS.GOOGLE_ID,
        clientSecret: PARAMTERS.GOOGLE_SECRET,
        callbackURL: PARAMTERS.GOOGLE_CALLBACK_URL
    },
    async (token, refreshToken, profile, done) => {
        console.log(`Google:`);
        console.log(profile);
        // console.log(token);

        process.nextTick(() => {
            // tìm trong db xem có user nào đã sử dụng google id này chưa
            checkLoginSocialNetwork(profile, done);
        });
    }
));

// passport Twitter
passport.use(new TwitterStrategy(
    {
        consumerKey: PARAMTERS.TWITTER_ID,
        consumerSecret: PARAMTERS.TWITTER_SECRET,
        callbackURL: PARAMTERS.TWITTER_CALLBACK_URL
    },
    async (token, refreshToken, profile, done) => {
        console.log(`Twitter:`);
        console.log(profile);

        process.nextTick(() => {
            // tìm trong db xem có user nào đã sử dụng twitter id này chưa
            checkLoginSocialNetwork(profile, done);
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user.username);
});
passport.deserializeUser((username, done) => {
    dbAcount.findOne({username}, (err, user) => {
        done(null, user);
    });
});