import mongoose from "mongoose";

const healthRecordSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    uhid: { type: String, default: '' }, // Unique Health ID
    village: { type: String, default: '' },
    district: { type: String, default: '' },
    state: { type: String, default: '' },
    
    // Health Information
    bloodGroup: { type: String, default: '' },
    height: { type: String, default: '' },
    weight: { type: String, default: '' },
    medicalConditions: { type: String, default: '' },
    allergies: { type: String, default: '' },
    currentMedications: { type: String, default: '' },
    vaccinationStatus: { type: String, default: '' }, // Overall vaccination status
    
    // Vaccination Records
    vaccinations: [{ 
        name: String, 
        date: String, 
        nextDueDate: String 
    }],
    
    // Documents
    documents: [{
        name: String,
        url: String,
        uploadDate: { type: Date, default: Date.now }
    }],
    
    // Visit History
    visits: [{
        date: String,
        reason: String,
        diagnosis: String,
        prescription: String,
        ashaWorker: String
    }],
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { minimize: false })

const healthRecordModel = mongoose.models.healthRecord || mongoose.model("healthRecord", healthRecordSchema);
export default healthRecordModel;

