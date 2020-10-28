import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

const createMember = (payload: any) => api.post('/member', payload);
const readMember = () => api.get('/member');
const updateMember = (id: any, payload: any) =>
  api.put(`/member/${id}`, payload);
const deleteMember = (id: any) => api.delete(`/member/${id}`);

export const post = (payload: any) => api.post('/member', payload);
export const getAll = () => api.get('/member');
export const NameDelete = (id: any) => api.delete(`/member/${id}`);
export const updateName = (id: any, payload: any) =>
  api.put(`/member/${id}`, payload);

// export const insertMovie = payload => api.post(`/movie`, payload)
// export const getAllMovies = () => api.get(`/movies`)
// export const updateMovieById = (id, payload) => api.put(`/movie/${id}`, payload)
// export const deleteMovieById = id => api.delete(`/movie/${id}`)
// export const getMovieById = id => api.get(`/movie/${id}`)

const apis = {
  createMember,
  readMember,
  updateMember,
  deleteMember,

  post,
  getAll,
  NameDelete,
  updateName,
};

export default apis;
