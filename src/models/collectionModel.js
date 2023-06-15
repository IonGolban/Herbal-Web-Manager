import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    plants: [{
        _id: String
    }],
    cover_img: { type: String },
    user_id: { type: String, required: true }
});

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;