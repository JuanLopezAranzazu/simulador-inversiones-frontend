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
    <button type="button" on:click={() => updateItem(item)}>Editar</button>
    <button type="button" class="delete" on:click={() => deleteItem(item._id)}
      >Eliminar</button
    >
  </div>
</div>

<style>
  .currency {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    background-color: var(--color2);
    color: #fff;
    border-radius: 8px;
    padding: 10px;
  }

  .currency-info {
    display: flex;
    gap: 5px;
  }

  .currency-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
</style>
