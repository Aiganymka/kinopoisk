const passport = require('passport')
const  User = require('../auth/user')
const bcrypt = require('bcrypt')
const LocalStratagy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new LocalStratagy(
    {
        usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email}).then(user =>{
            if(user == null){
                console.log('fgfgfg');
            }else{
                bcrypt.compare(password, user.password, function(err, result){
                    if (err){ return done ( err )}
                    if(result){return done( null, user)}
                });
            }
        }).catch(e => {
            return done(e)
        })

    }
))

passport.use(new GoogleStrategy({
    clientID: '201756040638-nghvk11rjnlhurl5k0dfbs2qt075m7nd.apps.googleusercontent.com',
    clientSecret:'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',
    callbackURL: "http://localhost:8000/api/auth/google",
    scope: ['openid', 'email', 'profile']
  },
  async function(accessToken, refreshToken, profile, cb) {
    const user = await User.find({googleId: profile.id})
    console.log(profile);
    const newUser = await new User({
        googleId: profile.id ,
        full_name: profile.displayName,
        email: profile.emails[0].value
    }).save()
    return cb(null, newUser);
  }
));

passport.serializeUser(function(user, done){
    done(null, user._id)
})
passport.deserializeUser(function(id, done){
    User.findById(id).then((user, err) => {
        done(err, user)
    })
})