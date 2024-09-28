import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/AuthSlice.js";
import jobPostSlice from "./Slices/jobPostSlice.js";
import companyPostSlice from "./Slices/companyCreateSlice.js"
const store = configureStore({
    reducer: {
        auth: AuthSlice,
        Job: jobPostSlice,
        company: companyPostSlice
    },
    devTools: true
})

export default store;