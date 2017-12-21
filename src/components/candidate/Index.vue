<template>
  <div class="">
    <h3>Candidatos <small>Lista de candidatos</small></h3>

    <b-button variant="primary"
      :to="{name: 'candidate.create' }">Novo</b-button>

    <div class="table-responsive">
      <table class="table table-striped secondary">
        <thead class="bg-secondary">
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>E-mail</th>
            <th nowrap>Data de nascimento</th>
            <th>Sexo</th>
            <th nowrap>Celular</th>
            <th nowrap>Criado em</th>
            <th nowrap>Atualizado em</th>
            <th nowrap></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="candidate in candidates">
            <td>{{ candidate.id }}</td>
            <td>{{ candidate.first_name }}</td>
            <td>{{ candidate.last_name }}</td>
            <td nowrap>{{ candidate.email }}</td>
            <td>{{ candidate.birth_date }}</td>
            <td>{{ candidate.gender }}</td>
            <td nowrap>{{ candidate.cell_phone }}</td>
            <td nowrap>{{ candidate.created_at }}</td>
            <td nowrap>{{ candidate.updated_at }}</td>
            <td nowrap>
              <b-dropdown id="actions" text="Ações" size="sm" variant="outline-secondary">
                <b-dropdown-item :to="{name: 'candidate.edit', params: { id: candidate.id } }">Editar</b-dropdown-item>
                <b-dropdown-item :to="{name: 'candidate.show', params: { id: candidate.id } }">Visualizar</b-dropdown-item>
                <b-dropdown-item v-on:click="download(candidate.id)"
                  v-if="candidate.has_curriculum_vitae">Download currículo</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item v-on:click="destroy(candidate.id)">Deletar</b-dropdown-item>
              </b-dropdown>
            </td>
          </tr>
          <tr v-if="!candidates.length" class="text-center">
            <td colspan="10">Nenhum candidato encontrado.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <paginator :resource_url="resource_url" @update="updateResource"></paginator>
  </div>
</template>

<script>
  import Paginator from '@/components/app/Paginator'
  import {API_URL} from '@/env'

  export default {
    components: {
      Paginator
    },
    name: 'CandidateIndex',
    data () {
      return {
        resource_url: API_URL + '/api/v1/candidates',
        candidates: []
      }
    },
    methods: {
      updateResource (data) {
        this.candidates = data
      },

      destroy (id) {
        this.$http.delete(API_URL + '/candidates/' + id)
        .then(response => {
          let processed = this.processResponse(response)
          this.$toastr('success', processed.message)
          this.$router.push({name: 'candidate.index', force: true})
        }).catch(response => {
          let processed = this.processResponse(response)
          this.$toastr('error', processed.message)
        })
      },

      download (id) {
        this.$http.get(API_URL + '/api/v1/candidates/' + id + '/curriculum-download')
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
  /**/
  table-responsive {
    min-height: 300px
  }
</style>
