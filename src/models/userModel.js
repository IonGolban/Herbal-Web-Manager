import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    description:{type:String},
    liked_photos: [{
        _id: String,
    }],
    collections: [{
        _id: String,
    }],
    faviroute_plants: [{
        _id: String,
    }],
    uploaded_plants: [{
        _id: String,
    }],
    profile_img: { type: String },
    cover_img: { type: String },
    email:{type:String,required:true},
    role: { type: String},
});

const User = mongoose.model("User", userSchema);

export default User;