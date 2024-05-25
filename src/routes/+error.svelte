<script>
  import "./../style/global.css";
  import { page } from "$app/stores";
</script>

<div class="container">
  <h1>{$page.error.message}</h1>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
</style>
