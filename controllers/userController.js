import User from '../models/user.js'
import asyncHandler from 'express-async-handler'
import { Redirect } from 'react-router'
import mongoose from 'mongoose'

//getUsers function to get all users
export const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})
    res.json({ users: users });
})
//getUserById function to retrieve user by id
export const getUserById  = asyncHandler(async(req, res) => {
    const user = await User.findById(req.params.id)
    //if user id match param id send user else throw error
    if(user){
        res.json(user)
    }else{
        res.status(404).json({message: "User not found"})
        res.status(404)
        throw new Error('User not found')
    }
})

// user = await User.findById(user._id).populate({
//     path: 'currentHoldings',
//     populate: {
//         path: 'user'
//     }
// });