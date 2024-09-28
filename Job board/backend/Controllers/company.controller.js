import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AppError from "../utils/appError.js";
import Company from "../models/company.model.js";
import cloudinary from "cloudinary"; // Ensure Cloudinary is properly configured
import fs from "fs/promises"; // For deleting files after upload

// Controller to create a company
export const createCompany = asyncHandler(async (req, res, next) => {
    const { nameOfCompany, aboutCompany } = req.body;

    // Check for missing required fields
    if (!nameOfCompany || !aboutCompany) {
        return next(new AppError('Name of company and about company are required', 400));
    }

    // Check if company name already exists
    const existingCompany = await Company.findOne({ nameOfCompany });
    if (existingCompany) {
        return next(new AppError('Company name already exists', 400));
    }

    // Create the company object
    const company = await Company.create({
        nameOfCompany,
        aboutCompany,
        user: req.user.id, // assuming req.user.id is set by authentication middleware
        companyLogo: {
            public_id: nameOfCompany, // Placeholder ID, you may update after Cloudinary upload
            secure_url: 'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg' // Default logo
        },
    });

    if (!company) {
        return next(new AppError('Company registration failed, please try again', 400));
    }

    // If a company logo is provided
    if (req.file && req.file.path) {
        try {
            // Upload the logo to Cloudinary
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: 'companies',
                width: 250,
                height: 250,
                crop: 'fill',
            });

            // Update company logo details in the database
            if (result) {
                company.companyLogo.public_id = result.public_id;
                company.companyLogo.secure_url = result.secure_url;

                // Remove the file after Cloudinary upload
                await fs.rm(req.file.path);
            }

        } catch (error) {
            console.error('Cloudinary Error:', error.message);
            return next(new AppError('File upload failed, please try again', 500));
        }
    }

    // Save the company with updated logo details
    await company.save();

    res.status(201).json({
        success: true,
        message: 'Company created successfully',
        data: company
    });
});

// Controller to get all companies
export const getAllCompanies = asyncHandler(async (req, res, next) => {
    const companies = await Company.find().populate('user', 'name email'); // Adjust fields as needed

    res.status(200).json({
        success: true,
        data: companies
    });
});

// Controller to get a single company by ID
export const getCompany = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const company = await Company.findById(id).populate('user', 'name email');

    if (!company) {
        return next(new AppError('Company not found', 404));
    }

    res.status(200).json({
        success: true,
        data: company
    });
});
