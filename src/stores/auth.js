import { defineStore } from 'pinia';
import router from '../router/index.js';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: {
      name: 'EMĪLS',
      surname: 'KONRĀDS',
      code: 'IT18013',
      favorite_songs: localStorage.getItem('favorite_songs') ? JSON.parse(localStorage.getItem('favorite_songs')) : [],
    },
    authenticated: localStorage.getItem('is_authenticated') === 'false', 
  }),
  actions: {
    authenticate(email, password) {
      const myEmail = 'emils.konrads@va.lv';
      const myPassword = '123456';
      if (email === myEmail && password === myPassword) {
        localStorage.setItem('is_authenticated', 'true');
        this.authenticated = true;
        router.push("/");
        console.log("You Logged In");
        console.log(this.authenticated);
      }
    },
    updateUser(name, surname, code) {
      this.user.name = name;
      this.user.surname = surname;
      this.user.code = code;
    },
    logout() {
      localStorage.clear();
      this.authenticated = false;
      router.push('/login');
    },
    toggleFavorite(songID) {
      const index = this.user.favorite_songs.indexOf(songID);
      if (index !== -1) {
        this.user.favorite_songs.splice(index, 1);
      } else {
        this.user.favorite_songs.push(songID);
      }
      localStorage.setItem('favorite_songs', JSON.stringify(this.user.favorite_songs));
    },
  },
  getters: {
    getFavoriteSongs() {
      return this.user.favorite_songs;
    },
    isAuthenticated() {
      return this.authenticated;
    },
  },
});