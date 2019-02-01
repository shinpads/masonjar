import axios from 'axios';
// import fetch from 'electron-fetch';
const { remote } = window.require('electron');
const fs = remote.require('fs');
const fetch = remote.require('node-fetch');
const extract = remote.require('extract-zip');

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
 login: async (email, password) => {
   const data = await axio.post('/api/login', { email, password });
   if (data.data.success) {
     window.localStorage.setItem('user', JSON.stringify(data.data.user));
   }
   return data.data.success;
 },
 register: async (email, username, password) => {
   const data = await axio.post('/api/register', { email, username, password });
   return data.data.success;
 },
 logout: async () => {
   await axio.post('/api/logout');
   window.localStorage.setItem('user', '');
 },
 downloadGame: (game, dest, progress, onDownloadComplete, onComplete) => {
   const { id, title } = game;
   return new Promise((resolve, reject) => {
     fetch(`http://localhost:3030/api/game/download/${id}`,
       { method: 'get', headers: { sid: window.localStorage.getItem('user_sid')}})
       .then(res => {
         resolve({
           fileSize: res.headers.get('content-length'),
         })
         let total = res.headers.get('content-length');
         let current = 0;
         console.log('size', res.headers.get('content-length'), res.headers.get('content-type'), res.headers.get('content-disposition'));
         const destStream = fs.createWriteStream(`${dest}/${title}.zip`);
         res.body
         .on('end', () => {
           extract(`${dest}/${title}.zip`, { dir: dest + '/' + title }, (err) => {
             if (err) console.warn(err);
             onComplete();
           });
           onDownloadComplete();
         })
         .pipe(destStream);
         res.body.on('data', chunk => {
           current += chunk.length;
           progress(current / total);
         });
       });
   });
  },
}


function generateSID() {
  const values = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const length = 20;
  let sid = '';
  for (let i = 0; i < length; i++) {
      sid += values[Math.floor(Math.random() * (values.length - 1))];
  }
  return sid;
}

export default api;
