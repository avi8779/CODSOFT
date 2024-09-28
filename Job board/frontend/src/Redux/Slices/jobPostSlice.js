// src/Redux/Slices/jobPostSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    jobData: [],
    error: null // Add an error field to track any errors
};

export const createJob = createAsyncThunk("/job/post", async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post("job/create", data);
        toast.success("Job created successfully!"); // Display success message
        return res.data; // Return the successful response
    } catch (error) {
        const errorMessage = error?.response?.data?.message || "Failed to create job";
        toast.error(errorMessage); // Display the error message
        return rejectWithValue(errorMessage); // Reject with error message
    }
});

export const getAllJob = createAsyncThunk("/job/get", async () => {
    try {
        const response = await axiosInstance.get("/get-jobs");
        toast.success("Jobs loaded successfully");
        return response.data; // Return the job data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const deleteJobs = createAsyncThunk("/job/delete", async (id) => {
    try {
        const response = await axiosInstance.delete(`/jobs/${id}`);
        toast.success("Job deleted successfully");
        return response.data; // Return the response data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

const jobPostSlice = createSlice({
    name: 'Job',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createJob.fulfilled, (state, action) => {
                // You can store the new job data if needed
                state.jobData.push(action.payload);
            })
            .addCase(createJob.rejected, (state, action) => {
                state.error = action.payload; // Store the error message
            })
            .addCase(getAllJob.fulfilled, (state, action) => {
                if (action.payload) {
                    state.jobData = action.payload;
                }
            });
    }
});

export default jobPostSlice.reducer;
