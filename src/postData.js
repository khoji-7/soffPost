// usePosts.js
import { useState } from 'react';

const usePosts = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  const updatePostStatus = (id, newStatus) => {
    setPosts(posts.map(post => post.id === id ? { ...post, status: newStatus } : post));
  };

  return { posts, addPost, updatePostStatus };
};

export default usePosts;
