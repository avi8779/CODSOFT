import express from 'express';
import { createCompany, getCompany, updateCompany, deleteCompany } from '../Controllers/company.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post('/create', upload.single("companyLogo"), isLoggedIn, createCompany);


router.get('/getCompany', isLoggedIn, getCompany);

router.put('/update', isLoggedIn, updateCompany);

router.delete('/delete', isLoggedIn, deleteCompany);

export default router;
