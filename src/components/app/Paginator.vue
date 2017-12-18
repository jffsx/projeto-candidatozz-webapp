<template>

  <div class="paginatior" v-if="this.pagination.next_page_url || this.pagination.prev_page_url">
    <button class="btn btn-default" @click="fetchData(pagination.prev_page_url)"
      :disabled="!pagination.prev_page_url">
      Anterior
    </button>
    <span> Página {{pagination.current_page}} de {{pagination.last_page}}</span>
    <button class="btn btn-default" @click="fetchData(pagination.next_page_url)"
      :disabled="!pagination.next_page_url">
      Pŕoximo
    </button>
  </div>

</template>

<script>
export default {
  props: {
    resource_url: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      pagination: {
        current_page: null,
        last_page: null,
        total_page: null,
        first_page_url: null,
        last_page_url: null,
        next_page_url: null,
        prev_page_url: null
      }
    }
  },
  methods: {
    fetchData (pageUrl) {
      pageUrl = pageUrl || this.resource_url

      this.$http.get(pageUrl)
        .then(function (response) {
          this.pagination.current_page = response.body.current_page
          this.pagination.last_page = response.body.last_page
          this.pagination.total_page = response.body.total_page
          this.pagination.first_page_url = response.body.first_page_url
          this.pagination.last_page_url = response.body.last_page_url
          this.pagination.next_page_url = response.body.next_page_url
          this.pagination.prev_page_url = response.body.prev_page_url

          this.$emit('update', response.body.data)
        })
    }
  },
  watch: {
    resource_url () {
      this.fetchData()
    }
  },
  created () {
    this.fetchData()
  }
}
</script>
