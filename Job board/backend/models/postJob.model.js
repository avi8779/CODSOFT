import mongoose, { model, Schema } from "mongoose";


const postJobSchema = new Schema({
    email: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    numberOfVacancy: {
        type: String,
        
    },
    jobTitle: {
        type: String,
        required: true,
    },
    jobPosting: {
        type: String,
        required: true,
        enum: ['Onsite', 'Remote']
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pinCode: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        enum: ['Fulltime', 'PartTime', 'Remote', 'Freelancer']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Link job to the user
        required: true,
      }
    
    

}, {timestamps: true,})


const Postjob = model('Postjob', postJobSchema);

export default Postjob;