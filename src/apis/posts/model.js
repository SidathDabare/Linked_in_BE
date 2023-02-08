import mongoose from "mongoose";

const { Schema,model } = mongoose

const postSchema = new Schema({
    text:{type:String,required:true},
    username:{type:String, required:true},
    image:{type:String,default:''},
    user:{type:mongoose.Types.ObjectId,ref:"Users"}
},
{timestamps: true},

)

export default model("Post",postSchema)