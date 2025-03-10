import mongoose from 'mongoose';

const { Schema } = mongoose;

const resourceSchema = new Schema({
  resourceName: String,
  resourceSize: String,
  uploadedBy: String,
  resourceDescription: String,
  resourceType: String,
  downloadCount: {
    type: Number,
    default: 0,
  },
  url: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;
