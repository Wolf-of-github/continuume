import Chat from '../models/chat.model.js'; 
import { errorHandler } from '../utils/error.js';

export const createAndUpdateChats = async (req, res, next) => {

  const { message } = req.body;
  const chatId = req.params.id;

  try {
    // Find the chat document by ID or create a new one if it doesn't exist
    let chat = await Chat.findById(chatId);
    
    if (!chat) {
      // If chat document does not exist, create a new one
      chat = new Chat({ _id: chatId, chats: [] });
    }

    // Add the new message to the chats array
    chat.chats.push({
      messageFrom: req.user.role,
      message: message,
      timestamp: Date.now(),
    });

    // Save the chat document
    await chat.save();

    res.status(201).json("Message added to chat");

  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const readChats = async (req, res, next) => {
  
  const chatId = req.params.id;
  
  try {
    
    const chat = await Chat.findById(chatId);
    
    if (!chat) {  
      return res.status(404).json({ message: 'Chat not found right now' });
    }
    res.status(200).json(chat.chats);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
}