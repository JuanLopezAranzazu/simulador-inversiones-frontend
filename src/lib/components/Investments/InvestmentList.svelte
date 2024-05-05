<script>
  export let component;
  export let items;
  export let keys;
  export let updateItem;
  export let deleteItem;
</script>

<div class="investment-list">
  {#if items.length === 0}
    <p>No hay inversiones</p>
  {:else}
    {#each items as item}
      <svelte:component
        this={component}
        {item}
        {keys}
        {updateItem}
        {deleteItem}
      />
    {/each}
  {/if}
</div>

<style>
  .investment-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
