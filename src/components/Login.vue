<template>
  <b-row class="justify-content-md-center mt-4" align-v="center">
    <b-col cols="4">
      <b-card header="<h3>Entrar <small>Faça o login</small></h3>"
        header-tag="header"
        title="Entrar">
        <b-form >
          <b-form-group id="email" label="E-mail:" label-for="last_name"
            description="">

            <b-form-input id="last_name" type="email" v-model="data.email"
              placeholder="Digite seu e-mail">
            </b-form-input>
          </b-form-group>

          <b-form-group id="password" label="Senha:" label-for="password"
            description="">

            <b-form-input id="password" type="password" v-model="data.password"
              placeholder="Digite sua senha">
            </b-form-input>
          </b-form-group>

        <b-button type="button" variant="primary"
          v-on:click="login()">Enviar</b-button>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
  import {getHeader} from '@/config'
  import {API_URL, API_CLIENT_ID, API_CLIENT_SECRET} from '@/env'
  import {mapState} from 'vuex'

  export default {
    computed: {
      ...mapState({
        userStore: state => state.UserStore
      })
    },
    data () {
      return {
        data: {
          email: 'user@admin.com',
          password: '1234'
        }
      }
    },
    methods: {
      login () {
        const data = {
          grant_type: 'password',
          client_id: API_CLIENT_ID,
          client_secret: API_CLIENT_SECRET,
          username: this.data.email,
          password: this.data.password,
          scope: '*'
        }

        const auth = {token: {}, user: {}}

        this.$http.post(API_URL + '/api/v1/oauth/token', data)
          .then(response => {
            if (response.status === 200) {
              auth.token.access = response.data.access_token
              auth.token.refresh = response.data.refresh_token

              window.localStorage.setItem('authUser', JSON.stringify(auth))

              this.$http.get(API_URL + '/api/v1/users/me', {headers: getHeader()})
                .then(response => {
                  auth.user = response.body.data
                  window.localStorage.setItem('authUser', JSON.stringify(auth))

                  this.$store.dispatch('setUser', auth)
                  this.$router.push({name: 'dashboard'})
                })
                .catch(response => {
                  let processed = this.processResponse(response)
                  this.$toastr('error', processed.message)
                })
            }
          })
          .catch(response => {
            let processed = this.processResponse(response)
            this.$toastr('error', processed.message)
          })
      }
    }
  }
</script>
