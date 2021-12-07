import axios from 'axios';

export const base_url = 'https://bayut.p.rapidapi.com';

export const api = async (url) => {
  const {data} = await axios.get(url, {
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key': 'bfdf8c2391msh18c226dc322eff6p17826ajsn55419a819e4c',
    },
  });
  return data;
};
