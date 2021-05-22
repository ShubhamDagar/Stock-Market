import connectDB from './config/mongo.js'
import userRoutes from './routes/userRoute.js'
import express from 'express'
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './models/user';
import session from 'express-session'
import flash from 'connect-flash'
import bodyParser from 'body-parser'
// import dotenv  from 'dotenv'

//connect database
connectDB()


const app = express();

const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    },

}

app.use(session(sessionConfig))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeU``ser());
// passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy({
    usernameField: 'email'
},
    function (email, password, done) {
        User.findOne({ email: email }, function (err, user) {
            if(err)
            {
                console.log('Error in finding user -> passport');
                return done(err);
            }
            if(!user || user.password != password){
                console.log("Invalid Email/Password");
                return done(null, false);
            }
            return done(null, user);
        });
    }
));
// User.deleteMany({}, function (err) { console.log(err) });
passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function(err, user){
        if(err){
            console.log('Error in finding user -> passport');
            return done(err);
        }
        return done(null, user);
    });
});

app.use((req, res, next) => {
    // console.log("server:", req.session)
    next();
})

app.use('/api/users', userRoutes);
const PORT = process.env.PORT || 5000

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running on port ${PORT}`));
