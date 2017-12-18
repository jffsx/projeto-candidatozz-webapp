<template>
  <div id="app">
    <app-header></app-header>
    <b-container >
      <router-view></router-view>
    </b-container>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from '@/components/app/Header'
  import AppFooter from '@/components/app/Footer'

  export default {
    components: {
      AppHeader,
      AppFooter
    },
    name: 'app'
  }
</script>

<style src="bootstrap/dist/css/bootstrap.css"></style>
<style src="bootstrap-vue/dist/bootstrap-vue.css"></style>

<style>
  /**/
</style>
