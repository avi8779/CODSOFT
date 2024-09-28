import express from 'express';
import { createJob, getAllJobs, getJobById, updateJob, deleteJob } from '../Controllers/postJob.controller.js'; // Adjust the import path based on your project structure
import { isLoggedIn } from "../middlewares/auth.middleware.js"
import multer from 'multer';
const upload = multer();

const router = express.Router();

router.post('/create', isLoggedIn, upload.none(), createJob);
router.get('/get-jobs', getAllJobs);
router.get('/jobs/:id', getJobById);
router.put('/jobs/:id', isLoggedIn, updateJob);
router.delete('/jobs/:id', isLoggedIn, deleteJob);

export default router;
