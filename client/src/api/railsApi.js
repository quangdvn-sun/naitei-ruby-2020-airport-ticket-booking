import axios from 'axios';

export const railsApi = axios.create({
  baseURL: 'http://localhost:3030/api/v1',
});

export const searchFlights = async flightData => {
  try {
    const { data } = await railsApi.post('/flights', { flight: flightData });
    return data;
  } catch (err) {
    console.log(err.message);
  }
};
