import mongoose from "mongoose";

const adminSchemas = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

export default mongoose.model('adminSchemas',adminSchemas);