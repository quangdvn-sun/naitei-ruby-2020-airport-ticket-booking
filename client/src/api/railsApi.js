import axios from 'axios';

export const railsApi = axios.create({
  baseURL: 'http://localhost:3030/api/v1',
});
