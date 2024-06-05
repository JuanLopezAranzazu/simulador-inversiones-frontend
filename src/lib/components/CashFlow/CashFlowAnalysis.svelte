<script>
  //components
  import Modal from "../Modal.svelte";
  import YearAnalysis from "./YearAnalysis.svelte";
  //store
  import { financingOptionsData, resourceData } from "./../../store/store";
  //utils
  import {
    calculateShare,
    calculateNominalRate,
    calculatePeriodicRate,
    data,
  } from "./../../utils/calculate";

  let showModal = false;
  let selectedYear = 1;
  const periods = data[$financingOptionsData.periodicity]; // periodos para analizar
  const years = Math.floor($financingOptionsData.term / periods); // años para analizar

  let elements;
  $: {
    elements = [];
    const resources = $resourceData.filter((el) => el.type === "Externo");
    elements = resources.map((el) => getInterest(el));
    console.log(elements);
  }

  function getInterest(item) {
    const { description, rate, value } = item;
    let copyValue = value;
    let elements = [];
    const nominalRate = calculateNominalRate(rate, periods);
    const periodicRate = calculatePeriodicRate(nominalRate, periods);
    const share = calculateShare(
      copyValue,
      periodicRate,
      $financingOptionsData.term
    );

    for (let i = 0; i < $financingOptionsData.term; i++) {
      const interest = copyValue * periodicRate;
      const pay = share - interest;
      copyValue -= pay;
      elements.push(interest);
    }
    return [description, elements];
  }

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }
</script>

<div class="cash-flow-analysis">
  <h2>Analisis flujo de caja</h2>
  <div class="see-data">
    <button on:click={openModal}>Ver</button>
  </div>

  {#if showModal}
    <Modal>
      <div class="modal-header">
        <h2>Analisis flujo de caja</h2>
      </div>
      <div class="modal-content">
        <YearAnalysis year={selectedYear} {elements} />
      </div>
      <div class="modal-footer">
        <div class="options">
          {#each Array.from({ length: years }, (_, i) => i + 1) as year}
            <button
              type="button"
              class:active={selectedYear === year}
              on:click={() => (selectedYear = year)}>Año {year}</button
            >
          {/each}
        </div>
        <button on:click={closeModal}>Aceptar</button>
      </div>
    </Modal>
  {/if}
</div>

<style>
  .cash-flow-analysis {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 10px;
    border: 1px solid #a9a9a9;
    border-radius: 8px;
    background-color: var(--color3);
    box-shadow: 0px 0px 5px 0px #a9a9a9;
  }

  .see-data {
    display: flex;
    justify-content: center;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    overflow-x: auto;
    max-height: 300px;
    width: 800px;
  }

  .modal-footer {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
  }

  .active {
    background-color: var(--color2);
  }

  .options {
    display: flex;
    justify-content: center;
    gap: 1rem;
    overflow-x: auto;
  }
</style>
