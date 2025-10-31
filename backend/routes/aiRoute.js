import express from 'express';
import multer from 'multer';
import { diagnose } from '../controllers/aiController.js';

// Use memory storage so we can forward image bytes to Gemini without touching disk
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

const aiRouter = express.Router();

// Accept up to 3 images named "images"
aiRouter.post('/diagnose', upload.array('images', 3), diagnose);

export default aiRouter;


