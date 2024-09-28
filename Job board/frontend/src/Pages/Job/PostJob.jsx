// src/PostJobForm.js

import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../../Redux/Slices/jobPostSlice';

const PostJob = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [jobData, setJobData] = useState({
        numberOfVacancy: '',
        jobTitle: '',
        jobPosting: 'Onsite',
        city: '',
        address: '',
        pinCode: '',
        state: '',
        jobType: 'Fulltime',
        user: ''
    });

    const [step, setStep] = useState(1);

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setJobData({
            ...jobData,
            [name]: value
        });
    };

    const createNewJob = async (event) => {
        event.preventDefault();
        // Validate input fields based on current step
        if (step === 1) {
            if (!jobData.jobTitle || !jobData.jobType || !jobData.numberOfVacancy || !jobData.jobPosting) {
                toast.error("Please fill all the details");
                return;
            }
        } else if (step === 2) {
            if (!jobData.city || !jobData.state || !jobData.pinCode || !jobData.address) {
                toast.error("Please fill all the details");
                return;
            }
        }

        if (step < 2) { 
            setStep(step + 1);
            return;
        }

        const formData = new FormData();

        // Append jobData fields to formData
        formData.append('jobTitle', jobData.jobTitle);
        formData.append('jobType', jobData.jobType);
        formData.append('numberOfVacancy', jobData.numberOfVacancy);
        formData.append('jobPosting', jobData.jobPosting);
        formData.append('city', jobData.city);
        formData.append('state', jobData.state);
        formData.append('pinCode', jobData.pinCode);
        formData.append('address', jobData.address);

        const response = await dispatch(createJob(formData));

        if (createJob.fulfilled.match(response)) {
            toast.success("Job posted successfully!");
            navigate("/"); // Navigate only if the job creation was successful
        }
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
            {step === 1 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-center">Job Details</h2>
                    <form onSubmit={createNewJob}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Job Title:</label>
                            <input
                                className="w-full px-3 py-2 border rounded-md"
                                type="text"
                                name="jobTitle"
                                value={jobData.jobTitle}
                                onChange={handleUserInput}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Number of Vacancies:</label>
                            <input
                                className="w-full px-3 py-2 border rounded-md"
                                type="text"
                                name="numberOfVacancy"
                                value={jobData.numberOfVacancy}
                                onChange={handleUserInput}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Job Posting Type:</label>
                            <select
                                className="w-full px-3 py-2 border rounded-md"
                                name="jobPosting"
                                value={jobData.jobPosting}
                                onChange={handleUserInput}
                            >
                                <option value="Onsite">Onsite</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-400"
                                onClick={prevStep}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700"
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-center">Address Information</h2>
                    <form onSubmit={createNewJob}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">City:</label>
                            <input
                                className="w-full px-3 py-2 border rounded-md"
                                type="text"
                                name="city"
                                value={jobData.city}
                                onChange={handleUserInput}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">State:</label>
                            <input
                                className="w-full px-3 py-2 border rounded-md"
                                type="text"
                                name="state"
                                value={jobData.state}
                                onChange={handleUserInput}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Pin Code:</label>
                            <input
                                className="w-full px-3 py-2 border rounded-md"
                                type="text"
                                name="pinCode"
                                value={jobData.pinCode}
                                onChange={handleUserInput}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Address:</label>
                            <input
                                className="w-full px-3 py-2 border rounded-md"
                                type="text"
                                name="address"
                                value={jobData.address}
                                onChange={handleUserInput}
                                required
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded-md hover:bg-gray-400"
                                onClick={prevStep}
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PostJob;
