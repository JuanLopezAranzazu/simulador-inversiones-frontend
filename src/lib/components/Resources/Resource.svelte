<script>
  //components
  import Text from "./../Text.svelte";
  //store
  import { totalInvestment } from "../../store/store";
  //utils
  import { data, calculateNominalRate } from "./../../utils/calculate";
  export let resource;
  export let updateResource;
  export let deleteResource;
  export let seeResource;

  $: periods = data[resource.periodicity];
  $: nominalRate = calculateNominalRate(resource.rate, periods) * 100;
  $: CPPC = (nominalRate * resource.value) / $totalInvestment;
  $: p = (resource.value * 100) / $totalInvestment;
</script>

<div class="item">
  <div class="resource-info">
    <div class="resource-info-col">
      <Text label="Descripción" value={resource.description} />
      <Text label="Capital" value={`${resource.value.toLocaleString()}$`} />
      <Text
        label="Tasa efectiva anual"
        value={`${resource.rate.toFixed(2)}%`}
      />
    </div>
    <div class="resource-info-col">
      <Text label="Periodicidad" value={resource.periodicity} />
      <Text label="Plazo" value={resource.term} />
      <Text label="Tasa nominal anual" value={`${nominalRate.toFixed(2)}%`} />
    </div>
    <div class="resource-info-col">
      <Text label="Tipo de recurso" value={resource.type} />
      <Text label="Participación" value={`${p.toFixed(2)}%`} />
      <Text label="CPPC" value={`${CPPC.toFixed(2)}%`} />
    </div>
  </div>
  <div class="resource-actions">
    {#if resource.type === "Externo"}
      <button type="button" on:click={() => seeResource(resource)}>Ver</button>
    {/if}
    <button type="button" on:click={() => updateResource(resource)}
      >Editar</button
    >
    <button
      type="button"
      class="delete"
      on:click={() => deleteResource(resource._id)}>Eliminar</button
    >
  </div>
</div>

<style>
  .resource-info {
    display: flex;
    gap: 1rem;
    flex: 1;
  }

  .resource-info-col {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
  }

  .resource-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
</style>
