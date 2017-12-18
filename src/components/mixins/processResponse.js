import Vue from 'vue'

Vue.mixin({
  methods: {
    processResponse: response => {
      if (response.status === 422) {
        let message = ''

        for (var k in response.data.message) {
          message += response.data.message[k] + '<br>'
        }

        response.message = message
        return response
      }

      response.message = response.data.message
      return response
    }
  }

})
