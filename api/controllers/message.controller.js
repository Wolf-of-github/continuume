import Message from '../models/message.model.js';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const createMessage = async (req, res, next) => {
  const { user1, user2, sender, content } = req.body;
  
  if (user1 === user2) return res.status(400).json({ error: 'User1 and User2 cannot be the same.' });
  
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
  
  if (user1 === user2) return res.status(400).json({ error: 'User1 and User2 cannot be the same.' });

  try {
    
    let chat = await Message.findOne({
      participants: { $all: [user1, user2], $size: 2 }
    });
    
    if (chat) {
      res.status(200).json(chat.messages);
    }
    else{
      res.status(200).json([])
    }

  } catch (error) {
    next(errorHandler(500, error.message));
  }
}


export const getUsersForMessages = async (req, res, next) => {
  try {
    let users;

    if (req.user.role !== 'admin') {
      // If the user is not an admin, return only the admin user
      users = await User.find({ role: 'admin', isVerified: 'YES' }, 'username fullname role email avatar -_id');
    } else {
      // If the user is an admin, return all users excluding the admin user
      users = await User.find({ role: { $ne: 'admin' }, isVerified: 'YES' }, 'username fullname role email avatar -_id');
    }

    res.status(200).json(users);

  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
