import React, { useState } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createAccount } from '../Redux/Slices/AuthSlice';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [step, setStep] = useState(1);
    const [signupData, setSignupData] = useState({
        fullName: '',
        email: '',
        city: '',
        state: '',
        pinCode: '',
        address: '',
        jobTitle: '',
        gender: '',
        password: '',
        avatar: '', // Ensure all form fields have an initial value
    });
    const [previewImage, setPreviewImage] = useState("");

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        });
    }

    function getImage(event) {
        event.preventDefault();
        const uploadedImage = event.target.files[0]; // Accessing the files correctly

        if (uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setPreviewImage(this.result);
            });
        }
    }

    async function createNewAccount(event) {
        event.preventDefault();
        // Validate inputs based on the current step
        if (step === 1) {
            if (!signupData.fullName || !signupData.email || !signupData.avatar || !signupData.password) {
                toast.error("Please fill all the details");
                return;
            }
        } else if (step === 2) {
            if (!signupData.city || !signupData.state || !signupData.pinCode || !signupData.address) {
                toast.error("Please fill all the details");
                return;
            }
        } else if (step === 3) {
            if (!signupData.jobTitle || !signupData.gender) {
                toast.error("Please fill all the details");
                return;
            }
        }

        if (step < 3) {
            setStep(step + 1); // Move to the next step
            return; // Do not submit the form data yet
        }

        // Step 3 is the last step, submit the form data
        const formData = new FormData();
        Object.entries(signupData).forEach(([key, value]) => {
            formData.append(key, value);
        });

        try {
            const response = await dispatch(createAccount(formData));
            if (response?.payload?.success) {
                toast.success("Account created successfully");
                navigate("/"); // Redirect on success
                // Reset the form data
                setSignupData({
                    fullName: '',
                    email: '',
                    city: '',
                    state: '',
                    pinCode: '',
                    address: '',
                    jobTitle: '',
                    gender: '',
                    password: '',
                    avatar: '',
                });
                setPreviewImage("");
            } else {
                toast.error(response?.payload?.message || "Failed to create account");
            }
        } catch (error) {
            toast.error("An error occurred: " + (error.response?.data?.message || error.message));
        }
    }

    const prevStep = () => {
        setStep(step - 1);
    };

    const formClassNames = 'bg-red p-6 border border-gray-300 shadow-lg rounded-lg w-full max-w-md mx-auto mt-8';

    switch (step) {
        // Step 1: User information
        case 1:
            return (
                <div className={formClassNames}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Registration</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="image_uploads" className="cursor-pointer">
                                {previewImage ? (
                                    <img className="w-24 h-24 rounded-full m-auto" src={previewImage} alt="Preview" />
                                ) : (
                                    <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                                )}
                            </label>
                            <input
                                onChange={getImage}
                                className="hidden"
                                type="file"
                                name="avatar"
                                id="image_uploads"
                                accept=".jpg, .jpeg, .png, .svg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Full Name:</label>
                            <input
                                className="w-full px-3 py-2 border rounded-md"
                                type="text"
                                name="fullName"
                                value={signupData.fullName}
                                onChange={handleUserInput}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Email:</label>
                            <input
                                className="w-full px-3 py-2 border rounded-md"
                                type="email"
                                name="email"
                                value={signupData.email}
                                onChange={handleUserInput}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Password:</label>
                            <input
                                className="w-full px-3 py-2 border rounded-md"
                                type="password"
                                name="password"
                                value={signupData.password}
                                onChange={handleUserInput}
                                required
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700"
                            onClick={createNewAccount}
                        >
                            Next
                        </button>
                    </form>
                </div>
            );

        // Step 2: Address Information
        case 2:
            return (
                <div className={formClassNames}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Address Information</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">City:</label>
                            <input
                                className="w-full px-3 py-2 border rounded-md"
                                type="text"
                                name="city"
                                value={signupData.city}
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
                                value={signupData.state}
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
                                value={signupData.pinCode}
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
                                value={signupData.address}
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
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700"
                                onClick={createNewAccount}
                            >
                                Next
                            </button>
                        </div>
                    </form>
                </div>
            );

        // Step 3: Job Details
        case 3:
            return (
                <div className={formClassNames}>
                    <h2 className="text-2xl font-bold mb-4 text-center">Job Information</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Job Title:</label>
                            <input
                                className="w-full px-3 py-2 border rounded-md"
                                type="text"
                                name="jobTitle"
                                value={signupData.jobTitle}
                                onChange={handleUserInput}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Gender:</label>
                            <select
                                className="w-full px-3 py-2 border rounded-md"
                                name="gender"
                                value={signupData.gender}
                                onChange={handleUserInput}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
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
                                type="button"
                                className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700"
                                onClick={createNewAccount}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            );

        default:
            return null;
    }
};

export default Signup;
