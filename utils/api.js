import axios from 'axios';

export const base_url = 'https://bayut.p.rapidapi.com';

export const api = async (url) => {

  const key =  process.env.NEXT_PUBLIC_KEY

  const {data} = await axios.get(url, {
    headers: {
      'x-rapidapi-host': 'bayut.p.rapidapi.com',
      'x-rapidapi-key':  key
    },
  });
  return data;
};
