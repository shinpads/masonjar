import axios from 'axios';

const api = {
 getGames: async () => {
   const data = await axios.get('http://localhost:3030/api/games');
   console.log(data.data.games);
   return data.data.games;
 }
}

export default api;
