import mongoose from "mongoose"


const PostSchema = new mongoose.Schema({
    thread: {
        type: mongoose.Schema.Types.ObjectId, ref: "Thread", required: true
      },
    HTMLPost: {
        type : String,
        minLength: 1
    },
    postNumber: {
        type : Number,
        required: true
    }
},{timestamps: true})

export const Post = mongoose.model("Post", PostSchema)