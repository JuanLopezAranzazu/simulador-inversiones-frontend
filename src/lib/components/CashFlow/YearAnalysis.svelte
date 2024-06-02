<script>
  //store
  import {
    growthFactorData,
    cashFlowData,
    financingOptionsData,
  } from "./../../store/store";
  //utils
  import { data } from "./../../utils/calculate";
  export let year; // año para analizar

  let viewInFlows = false;
  let viewOutFlows = false;
  const periods = data[$financingOptionsData.periodicity];
  const units = $growthFactorData.units;
  const prices = $growthFactorData.prices;
  const costs = $growthFactorData.costs;
  const style =
    "background-color: var(--color6); color: white; padding: 0.5rem;";
  const styleItemFlow = "box-shadow: none; padding: 0.5rem;";

  function seeInFlows() {
    viewInFlows = !viewInFlows;
  }

  function seeOutFlows() {
    viewOutFlows = !viewOutFlows;
  }

  // calcular totales generales de flujo de entrada y salida
  $: totalIncome = $cashFlowData
    .filter((el) => el.flowType === "Flujo de entrada")
    .reduce(
      (acc, el) =>
        acc +
        el.value *
          Math.pow((prices + 100) / 100, year - 1) *
          el.qty *
          Math.pow((units + 100) / 100, year - 1),
      0
    );

  $: totalExpenses = $cashFlowData
    .filter((el) => el.flowType === "Flujo de salida")
    .reduce((acc, el) => acc + (el.value / 100) * totalIncome, 0);

  // calcular totales individuales de flujo de entrada y salida
  $: totalInFlow = (flow) => {
    return `${Math.round(
      flow.value *
        Math.pow((prices + 100) / 100, year - 1) *
        flow.qty *
        Math.pow((units + 100) / 100, year - 1)
    ).toLocaleString()}$`;
  };

  $: totalOutFlow = (flow) => {
    return `${Math.round((flow.value / 100) * totalIncome).toLocaleString()}$`;
  };

  function filterByFlowType(flowType) {
    try {
      return $cashFlowData.filter((el) => el.flowType === flowType);
    } catch (error) {
      console.error(error);
    }
  }

  const inflows = filterByFlowType("Flujo de entrada");
  const outflows = filterByFlowType("Flujo de salida");
</script>

<div class="year-analysis">
  <div class="element-year-analysis">
    <div class="item" {style}>
      <h4>Flujo de entrada</h4>
      <h4>{Math.round(totalIncome).toLocaleString()}</h4>
      <div class="actions">
        <button on:click={seeInFlows}
          >{viewInFlows ? "Ocultar" : "Mostrar"}</button
        >
      </div>
    </div>
    {#if viewInFlows}
      <div class="flow-list-analysis">
        {#each inflows as el}
          <div class="item" style={styleItemFlow}>
            <p>{el.description}</p>
            <p>{totalInFlow(el)}</p>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div class="element-year-analysis">
    <div class="item" {style}>
      <h4>Flujo de salida</h4>
      <h4>{Math.round(totalExpenses).toLocaleString()}</h4>
      <div class="actions">
        <button on:click={seeOutFlows}
          >{viewOutFlows ? "Ocultar" : "Mostrar"}</button
        >
      </div>
    </div>
    {#if viewOutFlows}
      <div class="flow-list-analysis">
        {#each outflows as el}
          <div class="item" style={styleItemFlow}>
            <p>{el.description}</p>
            <p>{totalOutFlow(el)}</p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .year-analysis {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .element-year-analysis {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .flow-list-analysis {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-left: 1rem;
  }

  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
