import { getUsers, getUserById } from "../controllers/userController.js";
import express from 'express'
import passport from 'passport'
import User from '../models/user'
import catchAsync from '../config/catchAsync'
const router = express.Router()


// express router method to create route for getting all users
router.get('/me', (req, res) => {
    res.json(req.user);
})
router.get('/logout', (req, res) => {
    req.logout();
    res.json(null);
})
// router.route('/').get(getUsers)
router.post('/signup', catchAsync(async (req, res, next) => {
    try {
        const { email, name, password } = req.body;
        // const user = await User.
        const user = await User.create(req.body);
        // console.log(user);
        // const registeredUser = await User.register(user, password);
        req.login(user, err => {
            if (err) return next(err);
            // req.flash('success', 'Welcome to Yelp Camp!');
            res.json(user);
        })
    } catch (e) {
        // req.flash('error', e.message);
        console.log(e);
        res.json(null);
    }
}));
router.post('/login',
    passport.authenticate('local', { failureFlash: 'Invalid username or password.', failureRedirect: '/SignIn' }),
    (req, res) => {
    const redirectUrl = '/';
        delete req.session.returnTo;
        res.json(req.user);
})
// express router method to create route for getting users by id
router.route('/').get(getUsers)
router.route('/:id').get(getUserById)
export default router