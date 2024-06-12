<script>
  import "./../../style/global.css";
  import { SvelteEasyToast } from "svelte-easy-toast";
  //components
  import Header from "./Header.svelte";
</script>

<main>
  <Header />
  <div class="container"><slot /></div>
  <SvelteEasyToast />
</main>

<style>
  .container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    flex: 1;
    margin: 0 auto;
    max-width: var(--site-width);
    padding: 76px 16px 16px;
    gap: 16px;
  }
</style>
