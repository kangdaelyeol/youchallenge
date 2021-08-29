import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  data: { type: String, maxLength: 50, required: true },
  createAt: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

const commentModel = mongoose.model('Comment', commentSchema);

export default commentModel;
