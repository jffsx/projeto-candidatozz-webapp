<template>
  <div class="">
    <h3>Candidatos <small>Editar candidato {{ data.first_name }}</small></h3>

    <b-col cols="6">
      <b-form @submit="onSubmit">
        <b-form-group id="first_name" label="Nome:" label-for="first_name"
          description="">

          <b-form-input id="first_name" type="text" v-model="data.first_name"
            placeholder="Digite seu nome">
          </b-form-input>
        </b-form-group>

        <b-form-group id="last_name" label="Sobrenome:" label-for="last_name"
          description="">

          <b-form-input id="last_name" type="text" v-model="data.last_name"
            placeholder="Digite seu sobrenome">
          </b-form-input>
        </b-form-group>

        <b-form-group id="email" label="E-mail:" label-for="last_name"
          description="">

          <b-form-input id="last_name" type="email" v-model="data.email"
            placeholder="Digite seu e-mail">
          </b-form-input>
        </b-form-group>

        <b-form-group id="gender" label="Sexo:" label-for="gender">
          <b-form-select id="gender"
            :options="genders"
            v-model="data.gender">
          </b-form-select>
        </b-form-group>

        <b-form-group id="birth_date" label="Data de nascimento:" label-for="birth_date"
          description="">

          <b-form-input id="birth_date" type="text" v-model="data.birth_date"
            v-mask="'##/##/####'" placeholder="Digite sua data de nascimento">
          </b-form-input>

          <p>{{ data.age }} anos</p>
        </b-form-group>

        <b-form-group id="cell_phone" label="Número de celular:" label-for="cell_phone"
          description="">

          <b-form-input id="cell_phone" type="text" v-model="data.cell_phone"
            v-mask="['(##) ####-####', '(##) #####-####']" placeholder="Digite seu número de celular">
          </b-form-input>
        </b-form-group>

        <b-form-file id="curriculum_vitae" v-model="data.curriculum_vitae"
          choose-label="Currículo"></b-form-file>

        <b-button variant="link" v-if="data.has_curriculum_vitae"
          v-on:click="download()">Baixar currículo</b-button>

        <b-button variant="link" :to="{name: 'candidate.index' }">Voltar</b-button>
        <b-button type="submit" variant="primary">Enviar</b-button>
      </b-form>
    </b-col>
  </div>
</template>

<script>
  import {API_URL} from '@/env'
  import {mask} from 'vue-the-mask'

  export default {
    name: 'CandidateEdit',
    directives: {
      mask
    },
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
        },
        genders: [
          { value: '', text: 'Selecione' },
          { value: 'male', text: 'Masculino' },
          { value: 'female', text: 'Feminino' }
        ]
      }
    },

    created () {
      this.data.id = this.$route.params.id
      this.getData()
    },

    methods: {
      onSubmit (evt) {
        evt.preventDefault()

        let formData = new FormData()
        formData.append('_method', 'PUT')

        for (let key in this.data) {
          formData.append(key, this.data[key])
        }

        this.$http.post(API_URL + '/api/v1/candidates/' + this.data.id, formData)
          .then(response => {
            let processed = this.processResponse(response)
            this.$toastr('success', processed.message)
          }).catch(response => {
            let processed = this.processResponse(response)
            this.$toastr('error', processed.message)
          })
      },

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
