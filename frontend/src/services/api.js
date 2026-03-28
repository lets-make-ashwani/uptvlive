import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Fetch all posts with optional filters
export const fetchPosts = async (params = {}) => {
  const { data } = await api.get('/posts', { params });
  return data;
};

// Fetch single post by slug
export const fetchPostBySlug = async (slug) => {
  const { data } = await api.get(`/posts/${slug}`);
  return data;
};

export default api;
