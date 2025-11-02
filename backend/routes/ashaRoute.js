import express from 'express';
import { registerAsha, loginAsha, getAshaProfile, updateAshaVillages, getAshaCount } from '../controllers/ashaController.js';
import authAsha from '../middleware/authAsha.js';

const ashaRouter = express.Router();

ashaRouter.post('/register', registerAsha)
ashaRouter.post('/login', loginAsha)
ashaRouter.get('/profile', authAsha, getAshaProfile)
ashaRouter.post('/update-villages', authAsha, updateAshaVillages)
ashaRouter.get('/count', getAshaCount)

export default ashaRouter;


