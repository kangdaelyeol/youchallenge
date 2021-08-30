import fetch from 'node-fetch';
import regeneratorRuntime from 'regenerator-runtime';
const video = document.querySelector('.video');
const commentForm = document.querySelector('.commentform');
const commentInput = document.querySelector('.comment');
const commentSection = document.querySelector('.commentsection');

const createComment = (text, commentID) => {
  const li = document.createElement('li');
  li.dataset.id = commentID;
  const deleteBtn = document.createElement('span');
  const comment = document.createElement('span');
  deleteBtn.className = 'commentremove';
  deleteBtn.textContent = '💥';
  comment.textContent = text;
  li.appendChild(comment);
  li.appendChild(deleteBtn);
  commentSection.prepend(li);
};

const handleComment = async (e) => {
  e.preventDefault();
  if (commentInput.value === '') return;
  const videoID = video.dataset.id;
  const comment = commentInput.value;
  const res = await fetch(`/api/video/${videoID}/comment`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: comment }),
  }).catch((e) => console.log(e));
  console.log(res);
  if (res.status === 201) {
    const json = await res.json().catch((e) => console.log(e));
    commentInput.value = '';
    createComment(comment, json.commentID);
  }
};

const handleDelete = async (e) => {
  if (e.target.className !== 'commentremove') return;
  const commentID = e.target.dataset.commentid;
  try {
    const res = await fetch(`/api/video/${commentID}/delete`, {
      method: 'post',
    });
    if (res.status === 201) {
      const li = commentSection.querySelector(`[data-id="${commentID}"]`);
      li.remove();
    }
  } catch (e) {
    console.log(e);
  }
};

if (commentForm) commentForm.addEventListener('submit', handleComment);
commentSection.addEventListener('click', handleDelete);
