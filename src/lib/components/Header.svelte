<script>
  // assets
  import Icon from "../assets/Icon.svelte";
  import Icon2 from "../assets/Icon2.svelte";
  import Icon3 from "../assets/Icon3.svelte";
  import Icon4 from "../assets/Icon4.svelte";
  //components
  import Navbar from "./Navbar.svelte";

  const links = [
    { text: "Inversión", url: "/", component: Icon },
    { text: "Financiación", url: "/financing", component: Icon2 },
    { text: "Flujo de caja", url: "/", component: Icon3 },
    { text: "Escenarios Combinados", url: "/", component: Icon4 },
  ];
</script>

<header>
  <div class="header-content">
    <div class="header-elements">
      <h2>Investment Simulator</h2>
    </div>
    <Navbar {links} />
  </div>
</header>

<style>
  header {
    background-color: var(--color1);
    color: white;
    left: 0;
    right: 0;
    top: 0;
    position: fixed;
    z-index: 1000;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    height: 60px;
    margin: auto;
    max-width: var(--site-width);
  }

  .header-elements {
    display: flex;
    align-items: center;
    gap: 20px;
  }
</style>
