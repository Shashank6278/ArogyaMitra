import mongoose from "mongoose";

const ashaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    village: { type: String, default: '' }, // Kept for backward compatibility
    village1: { type: String, default: '' }, // Primary village
    village2: { type: String, default: '' }, // Secondary village
    village3: { type: String, default: '' }, // Tertiary village
    subcenter: { type: String, default: '' },
    block: { type: String, default: '' },
    district: { type: String, default: '' },
    state: { type: String, default: '' },
    dateOfJoining: { type: String, default: '' },
    idNumber: { type: String, default: '' },
    image: { type: String, default: '' },
    gender: { type: String, default: 'Not Selected' },
    address: { type: Object, default: { line1: '', line2: '' } },
}, { minimize: false })

const ashaModel = mongoose.models.asha || mongoose.model("asha", ashaSchema);
export default ashaModel;


