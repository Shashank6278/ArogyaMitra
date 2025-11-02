import express from 'express';
import { getAppointmentStats } from '../controllers/adminController.js';

const appointmentRouter = express.Router();

appointmentRouter.get("/stats", getAppointmentStats)

export default appointmentRouter;
