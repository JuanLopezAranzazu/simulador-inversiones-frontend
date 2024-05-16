<script>
  import { goto } from "$app/navigation";
  //components
  import InvestmentList from "./InvestmentList.svelte";
  //store
  import { investmentData, selectedInvestment } from "./../../store/store";

  let filteredElements = [];
  let selectedType = "";

  function deleteInvestment(investmentId) {
    investmentData.update((data) =>
      data.filter((investment) => investment._id !== investmentId)
    );
  }

  $: filteredElements =
    selectedType === ""
      ? $investmentData
      : $investmentData.filter(
          (investment) => investment.type === selectedType
        );
</script>

<div class="investments">
  <div class="options">
    <button
      class:active={selectedType === ""}
      on:click={() => {
        selectedType = "";
      }}
    >
      Inversión Todos
    </button>
    <button
      class:active={selectedType === "Fija"}
      on:click={() => {
        selectedType = "Fija";
      }}
    >
      Inversión Fija
    </button>
    <button
      class:active={selectedType === "Variable"}
      on:click={() => {
        selectedType = "Variable";
      }}
    >
      Inversión Variable
    </button>
  </div>

  <div class="save-data">
    <button
      on:click={() => {
        selectedInvestment.update((data) => (data = null));
        goto("/manage-investment");
      }}>Crear Cuenta Principal</button
    >
  </div>

  <InvestmentList
    investments={filteredElements}
    updateInvestment={(investment) => {
      selectedInvestment.update((data) => (data = investment));
      goto("/manage-investment");
    }}
    {deleteInvestment}
  />
</div>

<style>
  .investments {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .options {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .active {
    background-color: var(--color2);
  }

  .save-data {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
</style>
