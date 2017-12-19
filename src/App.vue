<template>
  <div id="app">
    <app-header></app-header>
    <b-container >
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import AppHeader from '@/components/app/Header'
  import AppFooter from '@/components/app/Footer'
  import {APP_NAME} from '@/env'

  export default {
    components: {
      AppHeader,
      AppFooter
    },
    name: 'app',
    computed: {
      ...mapState({
        userStore: state => state.UserStore
      })
    },
    created () {
      const auth = JSON.parse(window.localStorage.getItem('authUser'))
      this.$store.dispatch('setUser', auth)
      window.document.title = APP_NAME
    }
  }
</script>

<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.css"></style>

<style>
  body {
    padding-top: 5rem;
  }
</style>
