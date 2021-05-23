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
router.post('/signup', catchAsync(async (req, res, next) => {
    try {
        const { email, name, password } = req.body;
        const user = await User.create(req.body);
        req.login(user, err => {
            if (err) return next(err);
            res.json(user);
        })
    } catch (e) {
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
router.route('/').get(getUsers)
router.route('/:id').get(getUserById)
export default router