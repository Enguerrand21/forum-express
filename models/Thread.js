import mongoose from "mongoose"

const ThreadSchema = new mongoose.Schema({
    title: {
    type: String, 
    required: true, 
    trim: true, 
    minlength: 3,
    maxlength: 70
  },
  slug: {
    type: String, 
    unique: true 
  },
  postsCount: {
    type: Number, 
    default: 1
  },
   lastPostAt: {
    type: Date, 
    default: Date.now 
   }
}, {timestamps : true})

export const Thread = mongoose.model("Thread", ThreadSchema)