import { error, log } from "console";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import Company from "../models/company.model.js";
import AppError from "../utils/appError.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises'



export const createCompany = asyncHandler(async (req, res, next) => {
    console.log('Authenticated User:', req.user);
  // Convert req.body to a regular object to handle [Object: null prototype]
  const body = Object.assign({}, req.body);
  console.log('Request Body:', body);  // Log the converted body
  console.log('Uploaded File:', req.file); // Log the uploaded file

  const { nameOfCompany, aboutCompany } = body;


  if (!nameOfCompany || !aboutCompany) {
    console.error('Error: All fields are required.');
    return next(new AppError("All fields are required", 400));
  }

   const existingCompany = await Company.findOne({ user: req.user.id });
  if (existingCompany) {
      return next(new AppError("You can only create one company.", 403));
  }

  let companyLogo = {
      public_id: 'default-logo',
      secure_url: 'https://example.com/default-logo.png'  // Default logo URL if no file is uploaded
  };

  // Check if a file was uploaded
  if (req.file) {
      try {
          console.log('Attempting to upload file to Cloudinary');
          const result = await cloudinary.v2.uploader.upload(req.file.path, {
              folder: 'CompanyLogo',
              width: 250,
              height: 250,
              crop: 'fill',
          });

          companyLogo.public_id = result.public_id;
          companyLogo.secure_url = result.secure_url;

          // Remove the local file after upload
          await fs.unlink(req.file.path);
      } catch (error) {
          console.error('File Upload Error:', error.message); // Improved error logging
          return next(new AppError('File upload failed', 500));
      }
  }

  try {
      console.log('Saving company:', { nameOfCompany, aboutCompany, companyLogo });

      const company = new Company({
          nameOfCompany,
          aboutCompany,
          companyLogo,
          user: req.user.id,
      });

      await company.save();

      res.status(201).json({
          success: true,
          message: 'Company created successfully',
          company
      });
  } catch (error) {
      console.error('Database Save Error:', error.message);
      console.error('Error Stack:', error.stack);
      return next(new AppError("Failed to create company", 500));
  }
});


export const getCompany = asyncHandler(async (req, res, next) => {

});

export const updateCompany = asyncHandler(async (req, res, next) => {

})

export const deleteCompany = asyncHandler(async (req, res, next) => {

})