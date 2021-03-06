import Video from '../model/video';
import Comment from '../model/comment';
const heroku = process.env.NODE_ENV === 'production';
export const getUpload = (req, res) => {
  return res.render('videoupload', { pagetitle: 'Upload!' });
};

export const postUpload = async (req, res) => {
  const { title, tags } = req.body;
  const { video, thumb } = req.files;
  try {
    await Video.create({
      title,
      tags,
      owner: req.session.user._id,
      videoURL: heroku ? video[0].location : video[0].path,
      thumbURL: heroku ? thumb[0].location : thumb[0].path,
    });
    return res.redirect('/');
  } catch (e) {
    console.log(e);
  }
};

export const seeVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id).populate('comment');
    const comments = video.comment.reverse();
    if (!video) return res.render('404', { pagetitle: '404 NOT FOUND' });
    return res.render('videosee', { pagetitle: video.title, video, comments });
  } catch (e) {
    console.log(e);
  }
};

export const searchVideo = async (req, res) => {
  const { keyword } = req.query;
  try {
    const videos = await Video.find({
      title: {
        $regex: new RegExp(keyword, 'i'),
      },
    });
    return res.render('videosearch', { pagetitle: 'search!', videos, keyword });
  } catch (e) {
    console.log(e);
  }
};

export const getVideoEdit = async (req, res) => {
  const { id } = req.params;
  try {
    const video = await Video.findById(id);
    if (!video) return res.redirect('/');
    return res.render('videoedit', { pagetitle: 'editVideo', video });
  } catch (e) {
    console.log(e);
  }
};

export const postVideoEdit = async (req, res) => {
  const { id } = req.params;
  const { title, tags } = req.body;
  try {
    const video = await Video.findById(id);
    if (!video) return res.redirect('/');
    video.title = title;
    video.tags = Video.convertTags(tags);
    await video.save();

    return res.redirect('/');
  } catch (e) {
    console.log(e);
  }
};

// mSTO -> ref

// apiSection

export const enrollComment = async (req, res) => {
  const {
    params: { id },
    body: { text },
    session: { user },
  } = req;
  try {
    const video = await Video.findById(id);
    if (!video) return res.sendStatus(404);

    const comment = await Comment.create({
      owner: user._id,
      data: text,
    });
    video.comment.push(comment._id);
    await video.save();
    return res.status(201).json({ commentID: comment._id });
  } catch (e) {
    console.log(e);
  }
};

export const deleteComment = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const exists = await Comment.exists({ _id: id });
    console.log(exists);
    if (exists) {
      await Comment.findByIdAndDelete(id);
      return res.sendStatus(201);
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    console.log(e);
  }
};

export const addViews = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (!video) return res.sendStatus(404);
    video.meta.views++;
    await video.save();
    return res.status(201).json({ views: video.meta.views });
  } catch (e) {
    console.log(e);
  }
};
