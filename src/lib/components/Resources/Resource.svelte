<script>
  export let item;
  export let keys;
  export let updateItem;
  export let deleteItem;
</script>

<div class="resource">
  <div class="resource-info">
    {#each keys as key}
      <p>{key}: {item[key]}</p>
    {/each}
  </div>
  <div class="resource-actions">
    <button on:click={() => updateItem(item)}>Editar</button>
    <button on:click={() => deleteItem(item._id)}>Eliminar</button>
  </div>
</div>

<style>
  .resource {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: var(--color3);
    border-radius: 8px;
    padding: 10px;
  }

  .resource-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .resource-actions {
    display: flex;
    gap: 5px;
  }
</style>
