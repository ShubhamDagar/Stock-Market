import express from 'express'
import userRoute from './userRoute'
import stockRoute from './stockRoute'
const router = express.Router();

router.use('/users', userRoute);

router.use('/stocks', stockRoute);

export default router;
