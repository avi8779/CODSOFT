import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AppError from "../utils/appError.js";
import Postjob from "../models/postJob.model.js";
import Company from "../models/company.model.js";



export const createJob = asyncHandler(async (req, res, next) => {
    const { numberOfVacancy, jobTitle, jobPosting, city, address, pinCode, state, jobType } = req.body;

   
    if (!numberOfVacancy || !jobTitle || !jobPosting || !city || !address || !pinCode || !state || !jobType) {
        console.error('Error: All fields are required.');
        return next(new AppError('All fields are required', 400)); 
    }

    try {
       
        if (!req.user || !req.user.id) {
            return next(new AppError('User authentication required', 401));
        }

      
        const company = await Company.findOne({ user: req.user.id });
        
        if (!company) {
            return next(new AppError('No company associated with this user', 404));
        }

        // Create a new job posting
        const postjob = new Postjob({
            numberOfVacancy,
            jobTitle,
            jobPosting,
            city,
            address,
            pinCode,
            state,
            jobType,
            email: req.user.id, 
            company: company.id, 
            user: req.user.id,
        });

        await postjob.save();

        res.status(201).json({
            message: 'Job posting created successfully',
            postjob
        });
    } catch (error) {
        console.error('Database Save Error:', error);
        if (error.code === 11000) {
            // Duplicate key error
            return next(new AppError('Duplicate key error: Job might already exist', 400));
        }
        next(new AppError('Failed to create job posting', 500)); // Internal Server Error
    }
});



export const getAllJobs = asyncHandler(async (req, res, next) => {
    try {
        const jobPostings = await Postjob.find();
        res.status(200).json(jobPostings);
    } catch (error) {
        next(new AppError('Failed to fetch job postings', 500)); // Internal Server Error
    }
});


export const getJobById = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    try {
        const postjob = await Postjob.findById(id);
        if (!postjob) {
            return next(new AppError('Job posting not found', 404)); // Not Found
        }
        res.status(200).json(postjob);
    } catch (error) {
        next(new AppError('Failed to fetch job posting', 500)); // Internal Server Error
    }
});


export const updateJob = asyncHandler(async (req, res, next) => {
    const {numberOfVacancy, jobTitle, jobPosting, city, address, pinCode, state, jobType} = req.body;
    const { id } = req.params;

    const job = await Postjob.findById(id);
    
    if(!job) {
        return next(new AppError('Invalid job id or job doesnot exits'))
    }

    if (numberOfVacancy, jobTitle, jobPosting, city, address, pinCode, state, jobType) {
        job.numberOfVacancy = numberOfVacancy;
        job.jobTitle = jobTitle;
        job.jobPosting = jobPosting;
        job.city = city;
        job.address = address;
        job.state = state;
        job.jobType = jobType;
    }

    await job.save();

    res.status(200).json({
        success: true,
        message: 'Job details updated successfully'
    })
    
});

// Delete a job posting by ID
export const deleteJob = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    try {
        const postjob = await Postjob.findByIdAndDelete(id);
        if (!postjob) {
            return next(new AppError('Job posting not found', 404)); // Not Found
        }
        res.status(200).json({
            message: 'Job posting deleted successfully'
        });
    } catch (error) {
        next(new AppError('Failed to delete job posting', 500)); // Internal Server Error
    }
});
