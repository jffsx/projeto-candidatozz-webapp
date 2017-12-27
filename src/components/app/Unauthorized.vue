<template lang="html">
  <b-row>
    <b-col>
      <h1>Não autorizado</h1>
      <p>Desculpe, mas você não tem permissão para realizar esta ação.</p>
      <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
    </b-col>
  </b-row>
</template>

<script>
  export default {
  }
</script>
