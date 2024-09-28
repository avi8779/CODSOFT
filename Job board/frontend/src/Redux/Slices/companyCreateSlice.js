import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    companyData: [],  // Assuming you're handling multiple companies
    error: null,      // Optional: Add error state for better error handling
};

export const createCompany = createAsyncThunk(
    "company/create",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("/company/create/", data);
            toast.success(res.data?.message || "Company created successfully!");
            return res.data; // Assuming res.data contains the created company object
        } catch (error) {
            const message = error?.response?.data?.message || "Failed to create company";
            toast.error(message);
            return rejectWithValue(message); // Properly return the error message
        }
    }
);

export const getAllCompany = createAsyncThunk(
    "company/get",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("/company/getCompany");
            toast.success("Companies loaded successfully");
            return res.data; // Assuming res.data contains an array of companies
        } catch (error) {
            const message = error?.response?.data?.message || "Failed to get company data";
            toast.error(message);
            return rejectWithValue(message); // Properly return the error message
        }
    }
);

const CompanyPostSlice = createSlice({
    name: 'Company',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle successful retrieval of companies
            .addCase(getAllCompany.fulfilled, (state, action) => {
                if (action.payload) {
                    state.companyData = action.payload; // Assuming action.payload is an array of companies
                }
            })
            // Handle successful company creation
            .addCase(createCompany.fulfilled, (state, action) => {
                state.companyData.push(action.payload); // Assuming action.payload is the created company object
            })
            // Handle rejection during company retrieval
            .addCase(getAllCompany.rejected, (state, action) => {
                console.error("Error fetching companies:", action.payload);
                state.error = action.payload; // Optionally store the error in the state
            })
            // Handle rejection during company creation
            .addCase(createCompany.rejected, (state, action) => {
                console.error("Error creating company:", action.payload);
                state.error = action.payload; // Optionally store the error in the state
            });
    },
});

export default CompanyPostSlice.reducer;
