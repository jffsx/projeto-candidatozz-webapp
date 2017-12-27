<template>
  <b-navbar toggleable="md" type="dark" variant="warning" class="fixed-top">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-container>

      <b-navbar-brand href="#">Candidatozz</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse" v-if="userStore !== null && userStore.authUser">

        <b-navbar-nav>
          <b-nav-item to="/dashboard">Dashboard</b-nav-item>
          <b-nav-item to="/candidates" v-if="$can('administrator')">Candidatos</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em>{{ userStore.authUser.user.full_name }}</em>
            </template>
            <b-dropdown-item v-on:click="logout()">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>

    </b-container>
  </b-navbar>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'AppHeader',
    computed: {
      ...mapState({
        userStore: state => state.UserStore
      })
    },
    data () {
      return {
        user: mapState
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('clearUser')
        this.$router.push({name: 'login'})
      }
    }
  }
</script>
