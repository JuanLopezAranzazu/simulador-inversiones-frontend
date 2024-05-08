<script>
  export let item;
  export let keys;
  export let updateItem;
  export let deleteItem;

  function calculateTotal(investment) {
    return investment.price * investment.qty * investment.currency.value;
  }

  $: total = calculateTotal(item);
</script>

<div class="investment">
  <div class="investment-info">
    {#each keys as key}
      <p>{key}: {item[key]}</p>
    {/each}
    <p>total: {total.toLocaleString()}</p>
  </div>
  <div class="investment-actions">
    <button type="button" on:click={() => updateItem(item)}>Editar</button>
    <button type="button" class="delete" on:click={() => deleteItem(item._id)}
      >Eliminar</button
    >
  </div>
</div>

<style>
  .investment {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    background-color: var(--color3);
    border-radius: 8px;
    padding: 10px;
  }

  .investment-info {
    display: flex;
    gap: 1rem;
    flex: 1;
  }

  p {
    flex: 1;
  }

  .investment-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }
</style>
