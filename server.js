import userRoutes from "./routes/userRoute.js";
import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./models/user";
import session from "express-session";
import flash from "connect-flash";
import bodyParser from "body-parser";
import connectDB from "./config/mongo";
import mongoDbStore from "connect-mongo";
import stocksRandom from './config/stocksRandom';
import routes from './routes/index';
import stockController from './controllers/stockController'

//connect database
connectDB();
// stockController.randomStocks();
// stockController.putDummyStocks();

const app = express();
const sessionConfig = {
  secret: "thisshouldbeabettersecret!",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
  store: mongoDbStore.create(
    {
      mongoUrl:
        "mongodb+srv://jaivin:dtdljaivin@stockswebapp.qqmth.mongodb.net/stocksdb?retryWrites=true&w=majority",
      autoRemove: "disabled",
    },
    function (err) {
      console.log(err || "connect-mongo setup ok");
    }
  ),
};

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        let user = await User.findOne({ email: email });
        if (!user) {
          return done(null, false, { message: "No such user found !" });
        }
        console.log(typeof user.wrongCount);
        if (user.isLocked) {
          let updateTime = new Date(user.updatedAt);
          let currentTime = new Date();
          let timeEsc = (currentTime - updateTime) / (1000 * 60);
          let waitingTime = 60 - timeEsc;

          if (timeEsc >= 60) {
            await user.update({ isLocked: false, wrongCount: 0 });
            await user.save();
            user.isLocked = true;
            user.wrongCount = 0;
          } else {
            return done(null, false, {
              message: `User locked, wait ${Math.trunc(
                waitingTime
              )} mins ${Math.trunc(
                (waitingTime - Math.trunc(waitingTime)) * 60
              )} s`,
            });
          }
        }
        if (user.password != password) {
          if (user.wrongCount === 5) {
            await user.update({
              wrongCount: user.wrongCount + 1,
              isLocked: true,
            });
            await user.save();
            return done(null, false, { message: "User Locked for 1 Hr !" });
          } else {
            await user.update({ wrongCount: user.wrongCount + 1 });
            await user.save();
            return done(null, false, {
              message: `Wrong password, ${
                6 - user.wrongCount - 1
              } try remaining !`,
            });
          }
        }
        await user.update({ isLocked: false, wrongCount: 0 });
        await user.save();
        return done(null, user);
      } catch (error) {
        console.log(error);
      }
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log("Error in finding user -> passport");
      return done(err);
    }
    return done(null, user);
  });
});





app.use((req, res, next) => {
  let today = new Date("05/25/2021").getTime();

  // let rn = new Date();
  // let pm5 = new Date();
  // pm5.setHours(17, 0, 0, 0);
  // let timeRemaining = pm5 - new Date();
  // console.log(timeRemaining);
  // if (timeRemaining < 0)
  //   timeRemaining = (24 * 60 * 60 * 1000) + timeRemaining;
  // pm5 = timeRemaining / (1000 * 60 * 60);
  // let min = Math.trunc((pm5 - Math.trunc(pm5)) * 60);
  // let secs = Math.trunc(
  //   ((pm5 - Math.trunc(pm5)) * 60 - Math.trunc((pm5 - Math.trunc(pm5)) * 60)) *
  //     60
  // );
  // console.log(
  //   "Time remaining: ",
  //   Math.trunc(pm5),
  //   "hr",
  //   `${min}`,
  //   "mins",
  //   `${secs}`,
  //   "s"
  // );
  // console.log(rn.get);
  // console.log((rn - today) / (1000 * 60 * 60));
  next();
});

app.use("/api", routes);
const PORT = process.env.PORT || 5000;

//Express js listen method to run project on http://localhost:5000
app.listen(PORT, console.log(`App is running on port ${PORT}`));
