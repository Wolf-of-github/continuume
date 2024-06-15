import Form from '../models/form.model.js';
import { errorHandler } from '../utils/error.js';

export const createForm = async (req, res, next) => {
  const formData = req.body;
  const formId = req.params.id; // Assuming the id is available in req.params.id
  try {
    // Set the _id of the formData to the id from the route parameters
    formData._id = formId;

    const newForm = new Form(formData);
    // Save the new form
    await newForm.save();
    // Return the id of the newly created form
    res.status(201).json({ id: newForm._id });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

// export const deleteForm = async (req, res, next) => {
//   try {

//     const formId = req.params.id;
//     const form = await Form.findById(formId);

//     if (!form) {
//       return next(errorHandler(404, 'Form not found'));
//     }
//     await form.remove();
//     res.status(200).json('Form deleted successfully');
//   } catch (error) {
//     next(errorHandler(500, error.message));
//   }
// };

export const deleteForm = async (req, res, next) => {
  try {
    await Form.findByIdAndDelete(req.params.id);
    res.status(200).json('Form has been deleted!');
  } catch (error) {
    next(error);
  }
};