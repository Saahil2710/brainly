import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String,unique:true},
    password:{type:String}
})

const ContentSchema = new mongoose.Schema({
    title:String,
    link:String,
    type:String,
    types:[{type:mongoose.Types.ObjectId,ref:'Tag'}], // refer 
    userId:{type:mongoose.Types.ObjectId,ref:'User',required:true}
})


const LinkSchema = new mongoose.Schema({
    hash: {type:String,required:true},
    userId :{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true} //doesn't understand refer
})

export const userModel = mongoose.model("User",userSchema); 
export const ContentModel = mongoose.model("Content",ContentSchema);
export const LinkModel = mongoose.model("Link",LinkSchema);
