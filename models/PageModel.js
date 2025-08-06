import mongoose from 'mongoose'; // ✅ required import

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  redirect_url: { type: String },
  image_url: { type: String },
  ad_config: {
    google_adsense: { type: String },
    meta_adsense: { type: String },
  },
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema); // ✅ Correct usage
export default Job;
