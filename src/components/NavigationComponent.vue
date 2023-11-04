<template>
    <nav id="nav-main" class="wrapper-navigation">
      <ol>
        <li v-for="link in links" :key="link.text">
          <router-link :to="link.path">{{ link.text }}</router-link>
        </li>
      </ol>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavigationComponent',
    data() {
      return {
        links: [
          { text: 'SONGS', path: '/' },
          { text: 'ALBUMS', path: '/albums' },
          { text: 'ABOUT', path: '/about' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>