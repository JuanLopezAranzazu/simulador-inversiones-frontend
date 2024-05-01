<script>
  export let item;
  export let keys;
  export let updateItem;
  export let deleteItem;
</script>

<div class="currency">
  <div class="currency-info">
    {#each keys as key}
      <p>{key}: {item[key]}</p>
    {/each}
  </div>
  <div class="currency-actions">
    <button on:click={() => updateItem(item)}>Editar</button>
    <button on:click={() => deleteItem(item._id)}>Eliminar</button>
  </div>
</div>

<style>
  .currency {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: var(--color2);
    color: #fff;
    border-radius: 8px;
    padding: 10px;
  }

  .currency-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .currency-actions {
    display: flex;
    gap: 5px;
  }
</style>
