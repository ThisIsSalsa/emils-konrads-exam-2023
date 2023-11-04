<template>
  <div id="login-view">
    <form class="login-form" @submit.prevent="login">
      <div class="wrapper-logo">
        <img src="../assets/logo.svg" />
        <div>KRAKEN.FM</div>
      </div>
      <input id="input-email" v-model="user_form.email" placeholder="E-mail" />
      <input id="input-password" v-model="user_form.password" type="password" placeholder="Password" />
      <button id="btn-submit" type="submit" :disabled="!isFormValid">LOGIN</button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';
export default {
  data() {
    return {
      authStore: useAuthStore(),
      user_form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    isFormValid() {
      return this.user_form.email !== '' && this.user_form.password.length >= 6;
    }
  },
  methods: {
    login() {
      this.authStore.authenticate(this.user_form.email, this.user_form.password);
    }
  }
}
</script>