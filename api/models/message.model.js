import mongoose from 'mongoose';

const { Schema } = mongoose;

// Validator to ensure array has exactly two items
const twoItemArrayValidator = (val) => {
  return val.length === 2;
};

// Validator to ensure message content is not an empty string
const messageContentValidator = (val) => {
  return val.trim().length > 0;
};

// Define the schema with meaningful names and validation
const messageSchema = new Schema({
  participants: {
    type: [String],
    validate: [twoItemArrayValidator, 'Participants array must contain exactly two items']
  },
  messages: [
    {
      sender: { type: String, required: true },
      content: {
        type: String,
        required: true,
        validate: [messageContentValidator, 'Message content cannot be empty']
      },
      timestamp: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;
