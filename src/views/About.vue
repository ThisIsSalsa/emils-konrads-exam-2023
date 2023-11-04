<template>
  <div id="about-view">
    <div class="wrapper-header">
      <h1>ABOUT ME</h1>
      <div class="settings">
        <button id="btn-edit" @click="textEdit">{{ isEditing ? 'Cancel' : 'Edit Form' }}</button>
        <button id="btn-save" @click="saveForm">Save Form</button>
      </div>
    </div>
    <form>
      <div class="wrapper-input">
        <label>NAME</label>
        <input id="input-name" v-model="name" :readonly="!isEditing" />
        <p id="txt-name">{{ name }}</p>
      </div>
      <div class="wrapper-input">
        <label>SURNAME</label>
        <input id="input-surname" v-model="surname" :readonly="!isEditing" />
        <p id="txt-surname">{{ surname }}</p>
      </div>
      <div class="wrapper-input">
        <label>STUDENT CODE</label>
        <input id="input-code" v-model="code" :readonly="!isEditing" />
        <p id="txt-code">{{ code }}</p>
      </div>
    </form>
    <div class="wrapper-songs">
      <label>FAVORITE SONGS</label>
      <ul>
        <li v-for="(song, index) in authStore.user.favorite_songs" :key="index">
  <img id="img-album" :src="song.albumImage" />
  <div class="song-info">
    <p id="txt-song" class="song-name">{{ song.name }}</p>
    <p id="txt-artist" class="song-artists">{{ song.artist }}</p>
  </div>
</li>
      </ul>
      <div id="txt-empty" class="empty" v-if="!authStore.user.favorite_songs.length">NO FAVORITE SONGS</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from "@/stores/auth";

export default {
  setup() {
    const isEditing = ref(false);
    const authStore = useAuthStore();
    const name = ref(authStore.user.name);
    const surname = ref(authStore.user.surname);
    const code = ref(authStore.user.code);

    const textEdit = () => {
      isEditing.value = !isEditing.value;
    };

    const saveForm = () => {
      authStore.updateUser(name.value, surname.value, code.value);
      isEditing.value = false;
    };

    return { isEditing, name, surname, code, textEdit, saveForm, authStore };
  },
};
</script>