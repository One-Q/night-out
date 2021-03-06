import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: { type: 'String', required: true },
  picture: { type: 'String' },
  description: { type: 'String', required: true },
  category: { type: 'String', required: true },
  location: {
    city: { type: 'String', required: true },
    street: { type: 'String', required: true },
    latitude: { type: 'Number', required: true },
    longitude: { type: 'Number', required: true },
  },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  startTime: { type: 'Date', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  creator: { type: 'String', required: true, default : "cj9y2lgmx0000dgieyiyy7816" }
});

export default mongoose.model('Event', eventSchema);
