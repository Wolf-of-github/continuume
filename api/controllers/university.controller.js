import University from '../models/university.model.js';
import { errorHandler } from '../utils/error.js';

// Search universities
export const searchUniversities = async (req, res, next) => {
  try {
    const { query } = req.query; // Extract the search query
    if (!query) return res.status(400).json({ message: "Query parameter is required" });

    const universities = await University.find({
      name: { $regex: new RegExp(query, 'i') } // Case-insensitive search
    });
    res.json(universities);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const addUniversities = async (req, res, next) => {
  
  const formData = req.body;

  try {
    
    const newForm = new University  (formData);
    await newForm.save();
    
    res.status(201).json({ id: newForm._id });

  } catch (error) {
    next(errorHandler(500, error.message));
  }

};
