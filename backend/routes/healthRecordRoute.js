import express from 'express';
import { updateHealthRecord, getMyHealthRecord, getAllHealthRecords, addVaccination, addVisit } from '../controllers/healthRecordController.js';
import authUser from '../middleware/authUser.js';
import authAsha from '../middleware/authAsha.js';

const healthRecordRouter = express.Router();

// User routes (protected by authUser)
healthRecordRouter.post('/update', authUser, updateHealthRecord);
healthRecordRouter.get('/my-record', authUser, getMyHealthRecord);
healthRecordRouter.post('/add-vaccination', authUser, addVaccination);
healthRecordRouter.post('/add-visit', authUser, addVisit);

// ASHA routes (protected by authAsha)
healthRecordRouter.get('/all-records', authAsha, getAllHealthRecords);

export default healthRecordRouter;

