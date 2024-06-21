<script>
  //components
  import Text from "./../Elements/Text.svelte";
  import WarningModal from "./../Elements/WarningModal.svelte";
  export let flow;
  export let updateCashFlow;
  export let deleteCashFlow;

  let showWarningModal = false;

  function openWarningModal() {
    showWarningModal = true;
  }

  function closeWarningModal() {
    showWarningModal = false;
  }
</script>

<div class="item-container">
  <div class="item">
    <div class="flow-info">
      <Text label="Descripción" value={flow.description} />
      {#if flow.flowType === "Flujo de entrada"}
        <Text label="Cantidad" value={flow.qty.toLocaleString()} />
      {:else}
        <Text label="Tipo de egreso" value={flow.outputType} />
      {/if}
      <Text
        label={flow.flowType === "Flujo de entrada"
          ? "Precio por unidad"
          : "Porcentaje"}
        value={`${flow.value.toLocaleString()}${flow.flowType === "Flujo de entrada" ? "$" : "%"}`}
      />
      <Text label="Tipo de flujo" value={flow.flowType} />
    </div>
    <div class="flow-actions">
      <button type="button" on:click={() => updateCashFlow(flow)}>Editar</button
      >
      <button type="button" class="delete" on:click={openWarningModal}>
        Eliminar</button
      >
    </div>
  </div>
</div>

<WarningModal
  title="Advertencia"
  message="Estas seguro que deseas eliminar el flujo de caja?"
  show={showWarningModal}
  close={closeWarningModal}
  confirm={() => deleteCashFlow(flow._id)}
  state={true}
/>

<style>
  .item-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .flow-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
  }

  .flow-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
</style>
