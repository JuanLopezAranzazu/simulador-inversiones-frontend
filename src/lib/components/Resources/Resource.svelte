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
    <button type="button" on:click={() => updateItem(item)}>Editar</button>
    <button type="button" class="delete" on:click={() => deleteItem(item._id)}
      >Eliminar</button
    >
    {#if item.type === "Externo"}
      <button type="button" on:click={() => seeItem(item)}>Ver</button>
    {/if}
  </div>
</div>

<style>
  .resource {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    background-color: var(--color3);
    border-radius: 8px;
    padding: 10px;
  }

  .resource-info {
    display: flex;
    gap: 1rem;
    flex: 1;
  }

  .resource-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  p {
    flex: 1;
  }
</style>
