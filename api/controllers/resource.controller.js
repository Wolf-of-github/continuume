import Resource from '../models/resource.model.js';
import { errorHandler } from '../utils/error.js';

export const uploadResource = async (req, res, next) => {
  
  if (req.user.role != 'admin'){
      return res.status(401).json("Only admin can upload resources")
    }
  else{

    try{
    
      const { resourceName, resourceSize, uploadedBy, resourceDescription,resourceType, url } = req.body;

      const resource = new Resource({
        resourceName,
        resourceSize,
        uploadedBy,
        resourceDescription,
        resourceType,
        url
      });
      
      await resource.save();
      return res.status(201).json("Successfully uploaded the resource");

    }catch(error){
      next(errorHandler(500, error.message))
    }

  }

}
export const readResource = async (req, res, next) => {
    try{  

      const resources = await Resource.find({});
      return res.status(200).json(resources);

    }catch(error){
      next(errorHandler(500, error.message))
    }
}

export const deleteResource = async (req, res, next) => {
  
  if (req.user.role != 'admin'){
      return res.status(401).json("Only admin can delete resources")
    }
  else{

    try{

      await Resource.findByIdAndDelete(req.params.id);
      return res.status(201).json("Successfully deleted the resource");

    }catch(error){
      next(errorHandler(500, error.message))
    }

  }

}

export const updateResource = async (req, res, next) => {

  if (req.user.role != 'admin')
    return res.status(401).json("Only admin can update a resource")
  
  try {
    const id = req.params.id;
    const { resourceName, resourceSize, uploadedBy, resourceDescription, resourceType, url } = req.body;

    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      { resourceName, resourceSize, uploadedBy, resourceDescription, resourceType, url },
    );

    if (!updatedResource) {
      return next(errorHandler(404, 'Resource not found'));
    }

    return res.status(200).json("Resource updated");

  } catch (error) {
    next(errorHandler(500, error.message));
  }
};