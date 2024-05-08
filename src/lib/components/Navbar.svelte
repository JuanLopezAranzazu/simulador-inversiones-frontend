<script>
  export let links = [];
</script>

<nav>
  {#each links as link}
    <a href={link.url}>
      <svelte:component this={link.component} />
      {link.text}
    </a>
  {/each}
</nav>

<style>
  nav {
    display: flex;
    gap: 20px;
  }

  a {
    display: flex;
    gap: 5px;
    align-items: center;
    text-decoration: none;
    color: white;
  }

  .active {
    border-bottom: 1px solid var(--color2);
  }
</style>
