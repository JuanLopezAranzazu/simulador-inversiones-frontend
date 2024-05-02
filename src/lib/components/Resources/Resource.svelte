<script>
  //store
  import { totalInvestment } from "../../store/store";
  //utils
  import { data, calculateNominalRate } from "./../../utils/calculate";
  export let item;
  export let keys;
  export let updateItem;
  export let deleteItem;
  export let seeItem;

  $: periods = data[item.periodicity];
  $: nominalRate = calculateNominalRate(item.rate, periods);
  $: CPPC = (nominalRate * (item.value * 100)) / $totalInvestment;
</script>

<div class="resource">
  <div class="resource-info">
    {#each keys as key}
      <p>{key}: {item[key]}</p>
    {/each}
    <p>nominal: {nominalRate}</p>
    <p>CPPC: {CPPC}</p>
  </div>
  <div class="resource-actions">
    <button on:click={() => updateItem(item)}>Editar</button>
    <button on:click={() => deleteItem(item._id)}>Eliminar</button>
    {#if item.type === "Externo"}
      <button on:click={() => seeItem(item)}>Ver</button>
    {/if}
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
