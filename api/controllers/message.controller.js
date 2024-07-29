import Message from '../models/message.model.js';
import { errorHandler } from '../utils/error.js';

export const createMessage = async (req, res, next) => {
  const { user1, user2, sender, content } = req.body;

  try {
    let chat = await Message.findOne({
      participants: { $all: [user1, user2], $size: 2 }
    });

    if (chat) {
      // If chat exists, push the new message to the messages array
      chat.messages.push({ sender, content });
      await chat.save();
      res.status(200).json({"chat": "Message sent"});
    } else {
      // If no chat found, create a new chat
      chat = new Message({
        participants: [user1, user2],
        messages: [{
          sender,
          content
        }]
      });

      await chat.save();
      res.status(201).json("message success");

    }
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const readMessages = async (req, res, next) => {
  
  const { user1, user2 } = req.body;
  
  try {
    
    let chat = await Message.findOne({
      participants: { $all: [user1, user2], $size: 2 }
    });

    res.status(200).json(chat.messages);

  } catch (error) {
    next(errorHandler(500, error.message));
  }
}