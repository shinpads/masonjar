import axios from 'axios';
// import fetch from 'electron-fetch';
const { remote } = window.require('electron');
const fs = remote.require('fs');
const fetch = remote.require('node-fetch');

if (!window.localStorage.getItem('user_sid')) {
  window.localStorage.setItem('user_sid', generateSID());
}

const axio = axios.create({
  baseURL: 'http://localhost:3030',
  timeout: 5000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'sid': window.localStorage.getItem('user_sid'),
  },
});

const api = {
 getGames: async () => {
   try {
     const data = await axio.get('/api/games');
     console.log(data.data.games);
     return data.data.games;
   } catch (err) {
     console.error(err);
     return [];
   }
 },
 downloadGame: (game, dest) => {
   const { id, title } = game;
   fetch(`http://localhost:3030/api/game/download/${id}`)
    .then(res => {
      console.log('size', res.headers.get('content-length'), res.headers.get('content-type'), res.headers.get('content-disposition'));
      const destStream = fs.createWriteStream(`./${title}.zip`);
      res.body
        .on('end', () => console.log('done'))
        .pipe(destStream);
      res.body.on('data', chunk => console.log(chunk.length));

    });

  },
}


function generateSID() {
  const values = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const length = 20;
  let sid = '';
  for (let i = 0; i < length; i++) {
      sid += values[Math.floor(Math.random() * values.length - 1)];
  }
  return sid;
}

export default api;
