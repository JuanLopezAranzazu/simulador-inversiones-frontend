<script>
  export let component;
  export let items;
  export let keys;
  export let updateItem;
  export let deleteItem;
</script>

<div class="currency-list">
  {#each items as item}
    <svelte:component
      this={component}
      {item}
      {keys}
      {updateItem}
      {deleteItem}
    />
  {/each}
</div>

<style>
  .currency-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
