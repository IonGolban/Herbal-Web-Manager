import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
    id: String,
    slug: String,
    created_at: Date,
    updated_at: Date,
    promoted_at: Date,
    color: String,
    description: String,
    alt_description: String,
    urls: {
      full: String,
      regular: String,
      small: String,
    },
    links: {
      self: String,
      html: String,
      download: String,
      download_location: String
    },
    likes: Number,
    tags: [{
        type: String,
        title: String
      }],
    tags_preview: [{
        type: String,
        title: String
      }],
      views : Number,
      downloads: Number
  });
  
  const Plant = mongoose.model('Plant', plantSchema);
export default Plant;