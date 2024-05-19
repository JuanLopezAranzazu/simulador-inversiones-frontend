<script>
  //components
  import Text from "../Text.svelte";
  import SubelementList from "./../ManageInvestment/SubelementList.svelte";
  import WarningModal from "../WarningModal.svelte";
  //stores
  import { currencyData } from "./../../store/store";
  //utils
  import { calculateTotalInvestment } from "./../../utils/calculate";
  export let investment;
  export let updateInvestment;
  export let deleteInvestment;

  let viewItems = false;
  let showWarningModal = false;

  function openWarningModal() {
    showWarningModal = true;
  }

  function closeWarningModal() {
    showWarningModal = false;
  }

  function seeInvestment() {
    viewItems = !viewItems;
  }

  $: total =
    calculateTotalInvestment(investment, $currencyData) * investment.multiplier;
</script>

<div class="item-container">
  <div class="item">
    <div class="investment-info">
      <Text label="Descripción" value={investment.description} />
      <Text label="Total" value={total.toLocaleString()} />
      <Text label="Tipo de inversión" value={investment.type} />
      {#if investment.type === "Variable"}
        <Text
          label="Tiempo del proyecto"
          value={investment.multiplier.toLocaleString()}
        />
      {:else}
        <Text label="" value={""} />
      {/if}
    </div>
    <div class="investment-actions">
      <button type="button" on:click={() => seeInvestment()}
        >{viewItems ? "Ocultar" : "Mostrar"}</button
      >
      <button type="button" on:click={() => updateInvestment(investment)}
        >Editar</button
      >
      <button type="button" class="delete" on:click={openWarningModal}>
        Eliminar</button
      >
    </div>
  </div>
  {#if viewItems}
    <div class="item-container subelements-info">
      <SubelementList
        subelements={investment.subelements}
        readonly={false}
        updateSubelement={null}
        deleteSubelement={null}
      />
    </div>
  {/if}
</div>

<WarningModal
  title="Advertencia"
  message="Estas seguro que deseas eliminar la inversión?"
  show={showWarningModal}
  close={closeWarningModal}
  confirm={() => deleteInvestment(investment._id)}
  state={true}
/>

<style>
  .item-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .subelements-info {
    gap: 0.25rem;
  }

  .investment-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
  }

  .investment-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
</style>
