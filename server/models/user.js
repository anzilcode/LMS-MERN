import express from 'express'
import mongoose from 'mongoose'


const userSchema = new mongoose.Schema(
    {
        _id : {type:String, required:true},
        name: {type:String, required:true},
        email: {type:String, required:true},
        imageUrl:{type:String, required:true},
        enrolledCourses:[
            {
                type: mangoose.Schema.Types.ObjectId,
                ref:'Course'
            }
        ],
    },{timestamps: true})

const User = mongoose.model('User',userSchema)

export default User


