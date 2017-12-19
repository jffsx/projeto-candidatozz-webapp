<template>
  <footer class="footer ">
    <div class="container">
      <p class="text-muted">&copy <a href="https://eduzz.com" target="_blank">
        Eduzz</a>. Todos os direitos reservados</p>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'AppFooter'
  }
</script>

<style scoped>
  .footer {
    height: 60px;
    /*background-color: #f5f5f5;*/
  }

  .container .text-muted {
    margin: 20px 0;
  }

  .fixed-bottom {
    z-index: 1029;
  }
</style>
