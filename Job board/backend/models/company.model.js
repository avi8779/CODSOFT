import { model, Schema } from "mongoose";
import mongoose from "mongoose";


const companySchmema = new Schema({
  nameOfCompany: {
    type: String,
    required: [true, 'Path `nameOfCompany` is required.'],
},
aboutCompany: {
    type: String,
    required: [true, 'Path `aboutCompany` is required.'],
},
user: {
    type: mongoose.Schema.ObjectId,
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
}
}, { timestamps: true })


const Company = new model('Company', companySchmema);


export default Company;