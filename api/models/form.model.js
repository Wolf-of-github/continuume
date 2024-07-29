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
  ],
  workDetails: [
    {
      jobTitle: {type: String, required: true},
      organiztionName: String,
      organiztionAdd: String,
      organiztionPhone: String,
      startDate: String,
      endDate: String,
      jobCertificate: String,
    }
  ],
  documents:{
    resume: String,
    passport: String,
    tenthMS: String,
    twelfthMS: String,
    sop: String,
    personalHistory: String,
    bachelorsMarkSheets: [String]
  },
  courseDetails:{
    flyingAfter: {
      type: String,
      enum: ["Diploma", "Bachelors", "Twelfth"] 
    },
    interestedInCourses: [String]
  },
  university:{
    uniChoice1: String,
    uniChoice2: String,
    uniChoice3: String,
  }
  
}, { timestamps: true });



const Form = mongoose.model('Form', formSchema);
export default Form;
