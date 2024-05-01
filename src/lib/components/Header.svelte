<script>
  const links = [
    { text: "Inversión", url: "/" },
    { text: "Financiación", url: "/financing" },
  ];
</script>

<header>
  <div class="header-content">
    <div class="header-elements">
      <h2>Investment Simulator</h2>
    </div>
    <div class="header-elements">
      {#each links as link}
        <a href={link.url}>{link.text}</a>
      {/each}
    </div>
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
