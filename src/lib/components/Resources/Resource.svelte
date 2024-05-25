<script>
  //components
  import Text from "./../Text.svelte";
  import WarningModal from "../WarningModal.svelte";
  //store
  import { totalInvestment } from "../../store/store";
  //utils
  import { data, calculateNominalRate } from "./../../utils/calculate";
  export let resource;
  export let updateResource;
  export let deleteResource;
  export let seeResource;

  let showWarningModal = false;

  function openWarningModal() {
    showWarningModal = true;
  }

  function closeWarningModal() {
    showWarningModal = false;
  }

  $: periods = data[resource.periodicity];
  $: nominalRate = calculateNominalRate(resource.rate, periods) * 100;
  $: CPPC = (nominalRate * resource.value) / $totalInvestment;
  $: participation = (resource.value * 100) / $totalInvestment;
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
      {#if resource.type === "Externo"}
        <Text label="Plazo" value={resource.term} />
      {/if}
      <Text label="Tasa nominal anual" value={`${nominalRate.toFixed(2)}%`} />
    </div>
    <div class="resource-info-col">
      <Text label="Tipo de recurso" value={resource.type} />
      <Text label="Participación" value={`${participation.toFixed(2)}%`} />
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
    <button type="button" class="delete" on:click={openWarningModal}
      >Eliminar</button
    >
  </div>
</div>

<WarningModal
  title="Advertencia"
  message="Estas seguro que deseas eliminar el recurso?"
  show={showWarningModal}
  close={closeWarningModal}
  confirm={() => deleteResource(resource._id)}
  state={true}
/>

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
