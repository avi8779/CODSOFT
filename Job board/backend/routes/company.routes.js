import express from 'express';
import { createCompany, getAllCompanies, getCompany } from '../Controllers/company.controller.js';
import { isLoggedIn } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post('/create', upload.single("companyLogo"), isLoggedIn, createCompany);


router.get('/getCompany', isLoggedIn, getCompany);

router.get('/getAllCompany', isLoggedIn, getAllCompanies)


export default router;
