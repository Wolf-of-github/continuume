import mongoose from 'mongoose';

const { Schema } = mongoose;

const chatSchema = new Schema({
  chats: [{
    messageFrom: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    section: {type: String, default: "Generic"},
  }],
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
