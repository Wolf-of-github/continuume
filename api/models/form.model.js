// import mongoose from 'mongoose';

// const { Schema } = mongoose;

// // Define the schema for the entire form
// const formSchema = new Schema({
  
//   personal_details: {
//     firstName: String,
//     lastName: String,
//     email: String,
//     phoneNumber: String,
//     dateOfBirth: Date,
//     gender: { type: String, enum: ['Male', 'Female', 'Other'] },
//     nationality: String,
//     countryOfBirth: String,
//     nativeLanguage: String,
//     nameAsPerPassport: String,
//     passportIssueLocation: String,
//     passportNumber: String,
//     passportIssueDate: Date,
//     passportExpiryDate: Date,
//     p_country: String,
//     p_address1: String,
//     p_address2: String,
//     p_postalCode: String,
//     p_state: String,
//     p_city: String,
//     c_country: String,
//     c_address1: String,
//     c_address2: String,
//     c_postalCode: String,
//     c_state: String,
//     c_city: String,
//     emergency_contact_name: String,
//     emergency_contact_phone: String,
//     emergency_contact_email: String,
//     emergency_contact_relation: String
//   },
//   education: {
//     school_country: String,
//     school_institute: String,
//     school_address: String,
//     school_start_date: Date,
//     school_end_date: Date,
//     school_grade: String,
//     high_school_country: String,
//     high_school_institute: String,
//     high_school_address: String,
//     high_school_start_date: Date,
//     high_school_end_date: Date,
//     high_school_grade: String,
//     bachelors_country: String,
//     bachelors_institute: String,
//     bachelors_address: String,
//     bachelors_start_date: Date,
//     bachelors_end_date: Date,
//     bachelors_grade: String,
//     gre_taken: Boolean,
//     gre_verbal: Number,
//     gre_quant: Number,
//     gre_awa: Number,
//     english_proficiency_test_taken: Boolean,
//     toefl: Boolean,
//     ielts: Boolean,
//     test_date: Date,
//     test_score: Number
//   }
  
// }, { timestamps: true });

// const Form = mongoose.model('Form', formSchema);

// export default Form;


import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the schema for the entire form
const formSchema = new Schema({
  
  personal_details: {
    name: String,
    email: String,
    imageUrls: [String],
    pdf1Url: String,
    pdf2Url: String,
  },
  education: {
    school: String,
    degree: String,
  },
  travelAndVisa:{
    passpostNumber: String,
    visaType: String,
  }
  
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);

export default Form;
