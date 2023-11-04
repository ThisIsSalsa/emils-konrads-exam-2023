<template>
    <div id="songs-view" @scroll="handleScroll">
      <div class="wrapper-header">
        <h1>SONGS</h1>
        <div class="wrapper-search">
          <input id="input-search" placeholder="Search by title..." v-model="store.search" />
        </div>
        <div class="wrapper-settings">
          <button id="btn-show-favorites" :class="{ active: this.store.showFavorites }" @click="toggleFavorites">Show Favorites</button>
        </div>
      </div>
      <div class="wrapper-songs">
        <table cellspacing="0" cellpadding="0">
          <tr ref="header">
            <th id="th-id">#</th>
            <th id="th-title" :class="{ active: this.store.sort.by == 'title' }" @click="sortBy('title')">Title<IconCaretUp color="white" :class="{'flip-vertical':!this.store.sort.asc}" v-if="this.store.sort.by === 'title'" /></th>
            <th id="th-album" :class="{ active: this.store.sort.by == 'album' }" @click="sortBy('album')">Album<IconCaretUp class="sort-icon" color="white" :class="{'flip-vertical':!this.store.sort.asc}" v-if="this.store.sort.by === 'album'" /></th>
            <th id="th-artist" :class="{ active: this.store.sort.by == 'artist' }" @click="sortBy('artist')">Artist<IconCaretUp class="sort-icon" color="white" :class="{'flip-vertical':!this.store.sort.asc}" v-if="this.store.sort.by === 'artist'" /></th><th id="th-duration" :class="{ active: this.store.sort.by == 'duration' }" @click="sortBy('duration')">Duration<IconCaretUp color="white" :class="{'flip-vertical':this.store.sort.asc}" v-if="this.store.sort.by === 'duration'" /></th>
          </tr>
          <tr v-for="(song, index) in songList" :class="['song',{active:song.id==currentPlayingID}]" @dblclick="selectSong(song.id)">
            <td id="td-index">
              <IconPlay v-if="song.id==currentPlayingID" />
              <span v-if="!(song.id==currentPlayingID)" id="txt-index">{{ index + 1 }}</span>
            </td>
            <td id="td-title">
              <img :src="song.album.images[0].url" />
              {{ song.name }}
            </td>
            <td id="td-artist">{{ song.artists.map(artist => artist.name).join(", ") }}</td>
            <td id="td-album">{{ song.album.name }}</td>
            <td id="td-duration"> </td>
              {{ getTime(song.duration_ms) }}
            <IconHeart @click="addToFavorite(song)" :class="inFavorite(song.id)"/>
          
          </tr>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from "@/stores/auth";
  import { usePlayerStore } from "@/stores/player";
  import allSongs from "/src/data/songs.js";
  
  import IconPlay from '@/components/icons/IconPlay.vue';
  import IconHeart from '@/components/icons/IconHeart.vue';
  import IconCaretUp from '@/components/icons/IconCaretUp.vue';
  
  export default {
    name: 'Songs',
  components: {
    IconCaretUp,
    IconPlay,
    IconHeart
  },
  data() {
    return {
      allSongs,
      store: {
        showFavorites: false,
        search: "",
        sort: {
          by: "",
          asc: true
        }
      }
    }
  },
  
  methods: {
    addToFavorite(song) {
      useAuthStore().toggleFavorite(song.id);
    },
    sortByAlbum: function (songList) {
    if (this.store.sort.asc) 
      return songList.sort((a, b) => (a.album.name > b.album.name) ? 1 : -1);
    else  
      return songList.sort((a, b) => (a.album.name < b.album.name) ? 1 : -1);
  },
  sortByArtist: function (songList) {
    if (this.store.sort.asc) 
      return songList.sort((a, b) => (a.artists[0].name > b.artists[0].name) ? 1 : -1);
    else  
      return songList.sort((a, b) => (a.artists[0].name < b.artists[0].name) ? 1 : -1);
  },
    sortBy(item) {
      if (this.store.sort.by == item && this.store.sort.asc == true) {
        this.store.sort.asc = false;
      } else if (this.store.sort.by != item) {
        this.store.sort.by = item;
        this.store.sort.asc = true;
      }
      else {
        this.store.sort.by = "";
        this.store.sort.asc = false;
      }
    },
    inFavorite(id){
      let idx = useAuthStore().getFavoriteSongs.findIndex(songid => songid == id);
      if (idx != -1){
        return "active"
      }
      return "";
    },
    toggleFavorites() {
      this.store.showFavorites = !this.store.showFavorites;
    },
    search: function () {
      document.getElementById("input-search").value = this.store.search;
    },
    getTime: function (ms) {
      let minutes = Math.floor(ms / 60000);
      let seconds = ((ms % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    },
    filterFavorites: function (songList) {
      return songList.filter(song => useAuthStore().getFavoriteSongs.includes(song.id));
    },
    filterBySearch: function (songList) {
      return songList.filter(song => song.name.toLowerCase().includes(this.store.search.toLowerCase()));
    },
    sortByTitle: function (songList) {
      if (this.store.sort.asc) 
        return songList.sort((a, b) => (a.name > b.name) ? 1 : -1);
      else
        return songList.sort((a, b) => (a.name < b.name) ? 1 : -1);
    },
    sortByDuration: function (songList) {
      if (this.store.sort.asc) 
        return songList.sort((a, b) => (a.duration_ms > b.duration_ms) ? 1 : -1);
      else  
        return songList.sort((a, b) => (a.duration_ms < b.duration_ms) ? 1 : -1);
    },
    selectSong: function (songId) {
      let song = this.allSongs.find(song => song.id == songId);
      usePlayerStore().setNowPlaying(song);
    },
  },
  computed: {
    currentPlayingID(){return usePlayerStore().getNowPlayingSongId},
    favoriteList(){return useAuthStore().getFavoriteSongs},
    flip() {
      if(this.store.sort.asc)
        return "true";
      return "false";
    },    
    songList() {
    let resultSongs = [...allSongs];
    if (this.store.showFavorites) {
      resultSongs = this.filterFavorites(resultSongs);
    }
    if (this.store.search) {
      resultSongs = this.filterBySearch(resultSongs);
    }
    if (this.store.sort.by == "title") {
      resultSongs = this.sortByTitle(resultSongs);
    }
    if (this.store.sort.by == "duration") {
      resultSongs = this.sortByDuration(resultSongs);
    }
    if (this.store.sort.by == "album") {
      resultSongs = this.sortByAlbum(resultSongs);
    }
    if (this.store.sort.by == "artist") {
      resultSongs = this.sortByArtist(resultSongs);
    }
    return resultSongs;
  }
  }
}
</script>


<style scoped>
.sort-icon {
  /* Adjust the size as needed */
  width: 20px;
  height: 20px;
}
</style>
