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
    <button on:click={() => updateItem(item)}>Editar</button>
    <button on:click={() => deleteItem(item._id)}>Eliminar</button>
  </div>
</div>

<style>
  .investment {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: var(--color3);
    border-radius: 8px;
    padding: 10px;
  }

  .investment-info {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .investment-actions {
    display: flex;
    gap: 5px;
  }
</style>
