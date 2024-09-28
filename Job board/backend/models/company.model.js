import { model, Schema } from "mongoose";

const companySchema = new Schema({
    nameOfCompany: {
        type: String,
        required: [true, 'Path nameOfCompany is required.'],
        trim: true,
        unique: true, // Enforce uniqueness of company name
    },
    aboutCompany: {
        type: String,
        required: [true, 'Path aboutCompany is required.'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    companyLogo: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        },
    },
}, { timestamps: true });

const Company = model('Company', companySchema);

export default Company;
