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
     const data = await axio.get('/api/game/all');
     console.log(data.data.games);
     return data.data.games;
   } catch (err) {
     console.error(err);
     return [];
   }
 },
 login: async (email, password) => {
   const data = await axio.post('/api/user/login', { email, password });
   if (data.data.success) {
     window.localStorage.setItem('user', JSON.stringify(data.data.user));
   }
   return data.data.success;
 },
 register: async (email, username, password) => {
   const data = await axio.post('/api/user/register', { email, username, password });
   return data.data.success;
 },
 logout: async () => {
   await axio.post('/api/user/logout');
   window.localStorage.setItem('user', '');
 },
 downloadGame: (game, dest, progress, onDownloadComplete, onComplete) => {
   const { _id: id, title } = game;
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
         let path = window.localStorage.getItem('downloadPath') + '/' + title;
         if (!fs.existsSync(path )) {
           fs.mkdirSync(path);
         }
         const destStream = fs.createWriteStream(`${path}/${title}.zip`);
         res.body
         .on('end', () => {
           extract(`${path}/${title}.zip`, { dir: path }, (err) => {
             if (err) console.warn(err);
             fs.unlink(`${path}/${title}.zip`, (err) => {
               if (err) console.warn(err);
               onComplete();
             });
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
  getUsers: async () => {
    const res = await axio.get('/api/user/all');
    return res.data.users;
  },
  getUserFromSession: async () => {
    const res = await axio.get('/api/user/from-session');
    if (res.data.success) {
      window.localStorage.setItem('user', JSON.stringify(res.data.user));
    } else {
      window.localStorage.setItem('user', '');
    }
  },
  getPermissionsList: async () => {
    const res = await axio.get('/api/permissions-list');
    return res.data.permissionsList || {};
  }
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
