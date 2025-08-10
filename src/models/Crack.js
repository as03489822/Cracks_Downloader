import mongoose from 'mongoose';

const CrackSchema = new mongoose.Schema(
  {
    title: String,
    date: String,
    author: String,
    comments: Number,
    category: String,
    tags: [String],
    image: String,
    shortDescription: String,
    fullDescription: String,
    slug: String,
    details: {
      description: String,
      overview: String,
      features: [String],
      supported_browsers: [String],
      file_types: [String],
      what_is_new: {
        version: String,
        release_date: String,
        changes: String,
      },
      system_requirements: {
        os: String,
        memory: String,
        storage: String,
      },
      installation_steps: [String],
      download: {
        link_text: String,
        password: String,
      },
    },
    crackFileUrl: String,
  },
  { timestamps: true }
);

export default mongoose.models.Crack || mongoose.model('Crack', CrackSchema);
