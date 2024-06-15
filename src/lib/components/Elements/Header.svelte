<script>
  // assets
  import Icon from "./../../assets/Icon.svelte";
  import Icon2 from "./../../assets/Icon2.svelte";
  import Icon3 from "./../../assets/Icon3.svelte";
  import Icon4 from "./../../assets/Icon4.svelte";
  //components
  import Navbar from "./Navbar.svelte";
  //utils
  import { exportData, importData } from "./../../utils/data";
  import { clickOutside } from "./../../utils/event";
  //store
  import {
    currencyData,
    investmentData,
    resourceData,
    cashFlowData,
    financingOptionsData,
    growthFactorData,
    cashFlowOptionsData,
  } from "./../../store/store";
  import WarningModal from "./WarningModal.svelte";

  const links = [
    { text: "Inversión", url: "/investment", component: Icon },
    { text: "Financiación", url: "/financing", component: Icon2 },
    { text: "Flujo de caja", url: "/cash-flow", component: Icon3 },
    { text: "Escenarios Combinados", url: "/", component: Icon4 },
  ];

  const data = {
    currencies: $currencyData,
    investments: $investmentData,
    resources: $resourceData,
    cashFlows: $cashFlowData,
    financingOptions: $financingOptionsData,
    growthFactors: $growthFactorData,
    cashFlowOptions: $cashFlowOptionsData,
  };

  let fileInput;
  let showOptions = false;
  let showWarningModal = false;
  const style = "background-color: var(--color2); color: white;";

  function openWarningModal() {
    showWarningModal = true;
  }

  function closeWarningModal() {
    showWarningModal = false;
  }

  function toggleOptions(event) {
    showOptions = !showOptions;
    event.stopPropagation();
  }

  async function handleImportClick() {
    fileInput.click();
  }

  function handleExportClick() {
    exportData(data);
    showOptions = false;
  }

  async function handleFileChange(event) {
    try {
      const payload = await importData(event);
      console.log(payload);
      currencyData.set(payload.currencies);
      investmentData.set(payload.investments);
      resourceData.set(payload.resources);
      cashFlowData.set(payload.cashFlows);
      financingOptionsData.set(payload.financingOptions);
      growthFactorData.set(payload.growthFactors);
      cashFlowOptionsData.set(payload.cashFlowOptions);
      showOptions = false;
    } catch (error) {
      console.error(error);
      openWarningModal();
    }
  }
</script>

<header>
  <div class="header-content">
    <button type="button" {style} on:click={toggleOptions}>Datos</button>
    <div class="header-elements">
      <a href="/"><h2>Investment Simulator</h2></a>
    </div>
    <Navbar {links} />

    {#if showOptions}
      <div class="options-data" use:clickOutside={() => (showOptions = false)}>
        <div class="options-data-content">
          <div class="title">
            <h2>Importar/Exportar datos</h2>
          </div>
          <input
            type="file"
            bind:this={fileInput}
            on:change={handleFileChange}
            style="display: none;"
          />
          <button type="button" {style} on:click={handleImportClick}
            >Importar datos</button
          >
          <button type="button" {style} on:click={handleExportClick}
            >Exportar datos</button
          >
        </div>
      </div>
    {/if}
  </div>
</header>

<WarningModal
  title="Advertencia"
  message="Error al importar el archivo."
  show={showWarningModal}
  close={closeWarningModal}
/>

<style>
  header {
    background-color: var(--color1);
    color: white;
    left: 0;
    right: 0;
    top: 0;
    position: fixed;
    z-index: 1000;
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    height: 60px;
    margin: auto;
    max-width: var(--site-width);
  }

  .header-elements {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .options-data {
    position: absolute;
    top: 100%;
    margin-top: 0.25rem;
    padding: 1rem;
    background-color: var(--color1);
    color: #fff;
    border-radius: 8px;
  }

  .options-data-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .title {
    display: flex;
    justify-content: center;
  }
</style>
