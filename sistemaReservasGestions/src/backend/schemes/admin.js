import mongoose from "mongoose";

const adminSchemas = new mongoose.Schema({
    name: {
        typeof: String,
        required: true
    }
});

export default mongoose.model('adminSchemas',adminSchemas);