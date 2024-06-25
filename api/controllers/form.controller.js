import Form from '../models/form.model.js';
import { errorHandler } from '../utils/error.js';

export const createForm = async (req, res, next) => {
  
  const formData = req.body;
  const formId = req.params.id; // Assuming the id is available in req.params.id
  try {
    
    formData._id = formId;
    const newForm = new Form(formData);
  
    await newForm.save();
    
    res.status(201).json({ id: newForm._id });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};


export const updateForm = async (req, res, next) => {
  const formId = req.params.id;
  const formData = req.body;
  
  try {
    
    
    const form = await Form.findById(formId);
    
    if (!form) {
      return next(errorHandler(404, 'Form not found'));
    }
    
    form.set(formData);
    await form.save();

    res.status(200).json("Form updated");

  } catch (error) {
    next(errorHandler(500, error.message));
  }
};



export const deleteForm = async (req, res, next) => {
  try {
    await Form.findByIdAndDelete(req.params.id);
    res.status(200).json('Form has been deleted!');
  } catch (error) {
    next(error);
  }
};


export const readForm = async (req, res, next) => {
  
  const formId = req.params.id;
  
  try {
    
    const form = await Form.findById(formId);
    
    if (!form) {
      
      return res.status(404).json({ message: 'Form not found right now' });
    }
    res.status(200).json(form);
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};      