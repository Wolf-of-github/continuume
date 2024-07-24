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
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
    nationality: { type: String, required: true },
    countryOfBirth: { type: String, required: true },
    nativeLanguage: { type: String, required: true },
    nameAsPerPassport: { type: String, required: true },
    passportIssueLocation: { type: String, required: true },
    passportNumber: { type: String, required: true },
    passportIssueDate: { type: String, required: true },
    passportExpiryDate: { type: String, required: true },
    addressP: { type: String, required: true },
    postalCodeP: { type: String, required: true },
    stateP: { type: String, required: true },
    cityP: { type: String, required: true },
    emergencyContactName: { type: String, required: true },
    emergencyContactNumber: { type: String, required: true },
    emergencyContactEmail: { type: String, required: true },
    emergencyContactRelation: { type: String, required: true },
  },
  education: {
    school: { type: String, required: true },
    schoolCountry: { type: String, required: true },
    schoolAddress: { type: String, required: true },
    schoolStartDate: { type: String, required: true },
    schoolEndDate: { type: String, required: true },
    schoolGrade: { type: String, required: true },

    highSchool: { type: String, required: true },
    highSchoolCountry: { type: String, required: true },
    highSchoolAddress: { type: String, required: true },
    highSchoolStartDate: { type: String, required: true },
    highSchoolEndDate: { type: String, required: true },
    highSchoolGrade: { type: String, required: true },

    bachelorIn: { type: String, required: true },
    bachelorsInstitute: { type: String, required: true },
    bachelorsCountry: { type: String, required: true },
    bachelorsAddress: { type: String, required: true },
    bachelorsStartDate: { type: String, required: true },
    bachelorsEndDate: { type: String, required: true },
    bachelorsGrade: { type: String, required: true },

    greTaken: { type: String, required: true, enum: ["Yes", "No",] },

    greTotalScore: {
      type: Number,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value'
      }
    },
    greVerbalScore: {
      type: Number,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value or GRE is not taken'
      }
    },
    greQuantScore: {
      type: Number,
      validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer value or GRE is not taken'
      }
    },
    greAWAScore: {
      type: Number,
      enum: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
      message: '{VALUE} is not an acceptable value or GRE is not taken'
    },
    greTestDate: {
      type: String,
      required: true,
      message: 'GRE test date is required if GRE is taken'
    },

    toeflTaken: { type: String, required: true, enum: ["Yes", "No",] },
    
    toeflTotalScore: {
      type: Number,
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value or TOEFL is not taken'
    },
    toeflTestDate: {
      type: String,
      required: true,
      message: 'TOEFL test date is required if TOEFL is taken'
    },
  },  
  travelAndVisa: {
    visaRefuse: { type: String, required: true, enum: ["Yes", "No",] },
    refusedFor: {
      type: String,
      required: function () {
        return this.visaRefuse === "Yes";
      }
    },
    refusingCountry: {
      type: String,
      required: function () {
        return this.visaRefuse === "Yes";
      }
    },
    refusalDate: {
      type: String,
      required: function () {
        return this.visaRefuse === "Yes";
      }
    },
    refusalReason: {
      type: String,
      required: function (){
        return this.visaRefuse === "Yes";
      }
    }
  },
  references: [
      {
        referenceName: {type: String, required: true},
        referencePosition: {type: String},
        referenceTitle: {type: String},
        referenceWorkEmail: {type: String},
        referenceKnowDuration: {type: String},
        referencePhone: {type: String},
        referenceRelationship: {type: String},
        referenceInstitution: {type: String},
        referenceInstitutionAdd: {type: String},
        fileUrl: {type: String}
      }
  ]
  
}, { timestamps: true });



const Form = mongoose.model('Form', formSchema);
export default Form;
