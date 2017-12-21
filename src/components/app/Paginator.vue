<template>

  <div class="paginatior" v-if="pagination.links.next || pagination.links.previous">
    <button class="btn btn-default" @click="fetchData(pagination.links.previous)"
      :disabled="!pagination.links.previous">
      Anterior
    </button>
    <span> Página {{pagination.current_page}} de {{pagination.total_pages}}</span>
    <button class="btn btn-default" @click="fetchData(pagination.links.next)"
      :disabled="!pagination.links.next">
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
        links: {
          previous: null,
          next: null
        }
      }
    }
  },
  methods: {
    fetchData (pageUrl) {
      pageUrl = pageUrl || this.resource_url

      this.$http.get(pageUrl)
        .then(function (response) {
          this.pagination = response.body.meta.pagination

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
