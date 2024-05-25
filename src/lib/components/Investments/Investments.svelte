<script>
  import { goto } from "$app/navigation";
  import { SvelteEasyToast, toast } from "svelte-easy-toast";
  //components
  import InvestmentList from "./InvestmentList.svelte";
  //store
  import { investmentData, selectedInvestment } from "./../../store/store";

  let filteredElements = [];
  let selectedType = "";

  function deleteInvestment(investmentId) {
    try {
      investmentData.update((data) =>
        data.filter((investment) => investment._id !== investmentId)
      );
      toast({
        type: "success",
        position: "bottom-right",
        text: "Se ha eliminado la inversión correctamente!",
        title: "Inversión eliminada",
        delay: 3000,
      });
    } catch (error) {
      console.error(error);
    }
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

<SvelteEasyToast />

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
