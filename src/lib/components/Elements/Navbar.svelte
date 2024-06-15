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
</style>
