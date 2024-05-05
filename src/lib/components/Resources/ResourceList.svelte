<script>
  export let component;
  export let items;
  export let keys;
  export let updateItem;
  export let deleteItem;
  export let seeItem;
</script>

<div class="resource-list">
  {#if items.length === 0}
    <p>No hay recursos</p>
  {:else}
    {#each items as item}
      <svelte:component
        this={component}
        {item}
        {keys}
        {updateItem}
        {deleteItem}
        {seeItem}
      />
    {/each}
  {/if}
</div>

<style>
  .resource-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
