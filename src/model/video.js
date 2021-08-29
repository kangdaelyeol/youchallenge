import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, require: true },
  createAt: { type: Date, default: Date.now },
  tags: [{ type: String }],
  meta: {
    views: { type: Number, default: 0 },
  },
  videoURL: {
    type: String,
    required: true,
  },
  thumbURL: {
    type: String,
    required: true,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});
videoSchema.static('save', async () => {
  this.tags = this.tags[0].split(',').map((tag) => {
    tag = tag.trim();
    return tag.startsWith('#') ? tag : `#${tag}`;
  });
});
const videoModel = mongoose.model('Video', videoSchema);

export default videoModel;
