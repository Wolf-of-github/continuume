import mongoose from 'mongoose';

const { Schema } = mongoose;

const eventsSchema = new Schema({
  eventName: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  eventTime: {
    type: String,
    required: true
  },
  eventVenue: {
    type: String,
    required: true
  },
  eventRegistrationLink: {
    type: String,
  },
  eventBannerImage: {
    type: String,
  },
  eventDescription: {
    type: String,
    required: true
  },
  eventApplicableFor: {
    type: [String],
    default: ['All']
  },
  eventResources:{
    type: [String]
  }
}, { timestamps: true });

const Events = mongoose.model('Events', eventsSchema);

export default Events;
