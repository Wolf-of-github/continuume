import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the schema for the entire form
const formSchema = new Schema({
  
  personal_details: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    nationality: { type: String, required: true },
    countryOfBirth: { type: String, required: true },
    nativeLanguage: { type: String, required: true },
    nameAsPerPassport: { type: String, required: true },
    passportIssueLocation: { type: String, required: true },
    passportNumber: { type: String, required: true },
    passportIssueDate: { type: Date, required: true },
    passportExpiryDate: { type: Date, required: true },
    p_country: { type: String, required: true },
    p_address1: { type: String, required: true },
    p_address2: { type: String },
    p_postalCode: { type: String, required: true },
    p_state: { type: String, required: true },
    p_city: { type: String, required: true },
    c_country: { type: String, required: true },
    c_address1: { type: String, required: true },
    c_address2: { type: String },
    c_postalCode: { type: String, required: true },
    c_state: { type: String, required: true },
    c_city: { type: String, required: true },
    emergency_contact_name: { type: String, required: true },
    emergency_contact_phone: { type: String, required: true },
    emergency_contact_email: { type: String },
    emergency_contact_relation: { type: String, required: true }
  },
  education: {
    school_country: { type: String, required: true },
    school_institute: { type: String, required: true },
    school_address: { type: String, required: true },
    school_start_date: { type: Date, required: true },
    school_end_date: { type: Date, required: true },
    school_grade: { type: String, required: true },
    high_school_country: { type: String, required: true },
    high_school_institute: { type: String, required: true },
    high_school_address: { type: String, required: true },
    high_school_start_date: { type: Date, required: true },
    high_school_end_date: { type: Date, required: true },
    high_school_grade: { type: String, required: true },
    bachelors_country: { type: String, required: true },
    bachelors_institute: { type: String, required: true },
    bachelors_address: { type: String, required: true },
    bachelors_start_date: { type: Date, required: true },
    bachelors_end_date: { type: Date, required: true },
    bachelors_grade: { type: String, required: true },
    gre_taken: { type: Boolean, required: true },
    gre_verbal: Number,
    gre_quant: Number,
    gre_awa: Number,
    english_proficiency_test_taken: { type: Boolean, required: true },
    toefl: Boolean,
    ielts: Boolean,
    test_date: Date,
    test_score: Number
  }
  
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);

export default Form;
