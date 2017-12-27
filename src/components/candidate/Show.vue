<template>
  <div class="">
    <h3>Candidatos <small>Visualizar candidato</small></h3>

    <b-col cols="6">
      <b-form>
        <b-form-group id="first_name" label="Nome:" label-for="first_name"
          description="">

          <p>{{ data.first_name }}</p>
        </b-form-group>

        <b-form-group id="last_name" label="Sobrenome:" label-for="last_name"
          description="">

          <p>{{ data.last_name }}</p>
        </b-form-group>

        <b-form-group id="email" label="E-mail:" label-for="last_name"
          description="">

          <p>{{ data.email }}</p>
          </b-form-input>
        </b-form-group>

        <b-form-group id="gender" label="Sexo:" label-for="gender">

          <p>{{ data.gender_name }}</p>
        </b-form-group>

        <b-form-group id="birth_date" label="Data de nascimento:" label-for="birth_date"
          description="">

          <p>{{ data.birth_date }}</p>
        </b-form-group>

        <b-form-group id="cell_phone" label="Número de celular:" label-for="cell_phone"
          description="">

          <p>{{ data.cell_phone }}</p>
        </b-form-group>

        <b-button variant="link" v-if="data.has_curriculum_vitae"
          v-on:click="download()">Baixar currículo</b-button>

        <b-button variant="link"
          :to="{name: 'candidate.index' }">Voltar</b-button>
      </b-form>
    </b-col>
  </div>
</template>

<script>
  import {API_URL} from '@/env'

  export default {
    name: 'CandidateShow',
    data () {
      return {
        data: {
          id: null,
          first_name: '',
          last_name: '',
          email: '',
          birth_date: '',
          age: '',
          gender: '',
          cell_phone: '',
          curriculum_vitae: '',
          has_curriculum_vitae: false
        }
      }
    },

    created () {
      this.data.id = this.$route.params.id
      this.getData()
    },

    methods: {
      getData () {
        this.$http.get(API_URL + '/api/v1/candidates/' + this.data.id)
          .then(response => {
            this.data = response.body.data
          }).catch(response => {
            let processed = this.processResponse(response)
            this.$toastr('error', processed.message)
          })
      },

      download () {
        this.$http.get(API_URL + '/api/v1/candidates/' + this.data.id + '/curriculum-download')
          .then(response => {
            let processed = this.processResponse(response)
            this.$toastr('error', processed.message)
          }).catch(response => {
            let processed = this.processResponse(response)
            this.$toastr('error', processed.message)
          })
      }
    }
  }
</script>

<style scoped>
</style>
