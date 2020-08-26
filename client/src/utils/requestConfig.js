export const reqConfig = () => {
  const token = localStorage.getItem('token');

  let config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
};
