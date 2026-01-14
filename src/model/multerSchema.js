
import mongoose from "mongoose";

const multerSchema = new mongoose.Schema({
    picture: {
        type: String,
        required: true,
    },
})

export default mongoose.model("picture", multerSchema)