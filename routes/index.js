import express from 'express'
import userRoute from './userRoute.js'
import stockRoute from './stockRoute.js'
const router = express.Router();

router.use('/users', userRoute);

router.use('/stocks', stockRoute);

export default router;
