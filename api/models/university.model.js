import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the schema for the University model
const universitySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure each university name is unique
  },
  country: {
    type:String,
    required: true
  }
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Create the model from the schema
const University = mongoose.model('University', universitySchema);

export default University;
