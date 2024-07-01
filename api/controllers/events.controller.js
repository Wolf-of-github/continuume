import Events from '../models/events.model.js';
import { errorHandler } from '../utils/error.js';
import fetch from 'node-fetch';


export const createEvent = async (req, res, next) =>{
  
  if (req.user.role != 'admin') return res.status(401).json("Only admin can create events")
  
  const { eventName, eventDate, eventTime, eventVenue, eventRegistrationLink, eventBannerImage, eventDescription, eventApplicableFor, eventResources } = req.body;

  try {
    
    const newEvent = new Events({
      eventName,
      eventDate,
      eventTime,
      eventVenue,
      eventRegistrationLink,
      eventBannerImage,
      eventDescription,
      eventApplicableFor,
      eventResources
    });

    await newEvent.save();
    res.status(201).json("Event created");
  
  } catch (error) { 
    next(errorHandler(500, error.message))
  }  
}

export const updateEvent = async (req, res, next) => {

  if (req.user.role != 'admin') return res.status(401).json("Only admin can edit events")

  const eventId = req.params.id;
  const eventData = req.body;
  
  try {
    
    const event = await Events.findById(eventId);
    
    if (!event) {
      return next(errorHandler(404, 'Event not found'));
    }
    
    event.set(eventData);
    await event.save();

    res.status(200).json("Event updated");

  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const readEvent = async (req, res, next) => {
  
  try {  
    const events = await Events.find({});
    
    if (!events) {  
      return res.status(404).json({ message: 'Events not found right now' });
    }
    
    res.status(200).json(events);

  } catch (error) {
    next(errorHandler(500, error.message));
  }
};  

export const deleteEvent = async (req, res, next) => {
  
  if (req.user.role != 'admin') return res.status(401).json("Only admin can delete events")

  try{
    const eventId = req.params.id
    await Events.findByIdAndDelete(eventId);
    return res.status(201).json("Successfully deleted the event");

  }catch(error){
    next(errorHandler(500, error.message))
  }
}