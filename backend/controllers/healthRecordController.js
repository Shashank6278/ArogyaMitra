import healthRecordModel from "../models/healthRecordModel.js";
import userModel from "../models/userModel.js";

// API to create or update health record
const updateHealthRecord = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select('-password');
        
        if (!userData) {
            return res.json({ success: false, message: 'User not found' });
        }

        const recordData = {
            ...req.body,
            userName: userData.name,
            userEmail: userData.email,
            uhid: userData.uhid || '',
            village: userData.village || req.body.village,
            district: userData.district || req.body.district,
            state: userData.state || req.body.state,
            updatedAt: Date.now()
        };

        let record = await healthRecordModel.findOne({ userId });
        
        if (record) {
            // Update existing record
            Object.assign(record, recordData);
            await record.save();
        } else {
            // Create new record
            record = new healthRecordModel(recordData);
            await record.save();
        }

        res.json({ success: true, message: 'Health record updated successfully', record });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to get user's own health record
const getMyHealthRecord = async (req, res) => {
    try {
        const { userId } = req.body;
        const record = await healthRecordModel.findOne({ userId });
        
        if (!record) {
            return res.json({ success: true, record: null, message: 'No health record found' });
        }

        res.json({ success: true, record });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API for ASHA workers to get all rural users' health records
const getAllHealthRecords = async (req, res) => {
    try {
        const records = await healthRecordModel.find({}).sort({ updatedAt: -1 });
        res.json({ success: true, records });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to add vaccination record
const addVaccination = async (req, res) => {
    try {
        const { userId, vaccination } = req.body;
        const record = await healthRecordModel.findOne({ userId });
        
        if (!record) {
            return res.json({ success: false, message: 'Health record not found' });
        }

        record.vaccinations.push(vaccination);
        record.updatedAt = Date.now();
        await record.save();

        res.json({ success: true, message: 'Vaccination added successfully', record });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// API to add visit history
const addVisit = async (req, res) => {
    try {
        const { userId, visit } = req.body;
        const record = await healthRecordModel.findOne({ userId });
        
        if (!record) {
            return res.json({ success: false, message: 'Health record not found' });
        }

        record.visits.push(visit);
        record.updatedAt = Date.now();
        await record.save();

        res.json({ success: true, message: 'Visit added successfully', record });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { updateHealthRecord, getMyHealthRecord, getAllHealthRecords, addVaccination, addVisit };

