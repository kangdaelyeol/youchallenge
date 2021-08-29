import User from '../model/user';
import Video from '../model/video';
export const home = async (req, res) => {
  const videos = await Video.find({}).populate("owner").sort({ createAt: 'desc' });
  return res.render('home', { pagetitle: 'home', videos });
};

export const getLogin = (req, res) => {
  return res.render('login', { pagetitle: 'login' });
};

export const postLogin = async (req, res) => {
  const { id, password } = req.body;
  const user = await User.findOne({ id });
  if (!user)
    return res.render('login', {
      pagetitle: 'login',
      errormessage: 'this id is not exists',
    });
  const compare = await User.comparePW(password, user.password);
  if (!compare) {
    return res.render('login', {
      pagetitle: 'login',
      errormessage: 'password is not match!',
    });
  }
  req.session.user = user;
  req.session.login = true;
  // loginLogic
  return res.redirect('/');
};

export const getJoin = (req, res) => {
  return res.render('join', { pagetitle: 'join' });
};

export const postJoin = async (req, res) => {
  const { id, nickname, password } = req.body;
  if (!id || !password)
    return res.render('join', {
      pagetitle: 'join',
      errormessage: 'please input to all things',
    });
  try {
    const hashUserPW = await User.hashPW(password);
    await User.create({ id, nickname, password: hashUserPW });
    return res.redirect('/');
  } catch (e) {
    return res.render('join', {
      pagetitle: 'join',
      errormessage: 'this id is using already. please input another id',
    });
  }
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

export const getProfile = async (req, res) => {
  const { _id } = req.session.user;
  const videos = await Video.find({owner: _id});
  return res.render('profile', {
    pagetitle: `profile - ${req.session.user.id}`,
    videos
  });
};

export const getEditProfile = (req, res) => {
  return res.render('editprofile', { pagetitle: 'editProfile' });
};

export const postEditProfile = async (req, res) => {
  const { id } = req.params;
  const { userid, nickname } = req.body;
  const exist = await User.exists({ $or: [{ id: userid }, { nickname }] });
  if(exist) return res.redirect("/");
  const user = await User.findById(id);
  if (!user) return res.redirect('/');
  user.id = userid;
  user.nickname = nickname;
  await user.save();
  req.session.user = user;
  return res.redirect('/');
};

export const getChangePW = (req, res) => {
  return res.render('changepassword', { pagetitle: 'changePassword' });
};

export const postChangePW = async (req, res) => {
  const { id } = req.params;
  const { password, changepassword } = req.body;
  const user = await User.findById(id);
  if (!user) return res.redirect('/');
  const comp = await User.comparePW(password, user.password);
  if (!comp) return res.redirect('/');
  user.password = await User.hashPW(changepassword);
  await user.save();
  return res.redirect('/logout');
};
