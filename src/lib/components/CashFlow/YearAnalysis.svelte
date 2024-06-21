<script>
  //store
  import {
    growthFactorData,
    cashFlowData,
    financingOptionsData,
    totalInvestmentByType1,
    cashFlowOptionsData,
  } from "./../../store/store";
  //utils
  import { data } from "./../../utils/calculate";
  export let year; // año para analizar
  export let elements; // intereses por periodo de cada recurso

  let viewInFlows = false;
  let viewOutFlows = false;
  let viewNetIncome = false;
  let viewExpenses = false;
  const periods = data[$financingOptionsData.periodicity];
  const units = $growthFactorData.units;
  const prices = $growthFactorData.prices;
  const costs = $growthFactorData.costs;

  function seeInFlows() {
    viewInFlows = !viewInFlows;
  }

  function seeOutFlows() {
    viewOutFlows = !viewOutFlows;
  }

  function seeNetIncome() {
    viewNetIncome = !viewNetIncome;
  }

  function seeExpenses() {
    viewExpenses = !viewExpenses;
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
    return Math.round(
      flow.value *
        Math.pow((prices + 100) / 100, year - 1) *
        flow.qty *
        Math.pow((units + 100) / 100, year - 1)
    ).toLocaleString();
  };

  $: totalOutFlow = (flow) => {
    return Math.round((flow.value / 100) * totalIncome).toLocaleString();
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

  // depreciacion y amortizacion
  $: totalAmortization = Math.round(
    ($cashFlowOptionsData.amortization / 100) * $totalInvestmentByType1
  );

  // gastos financieros
  $: elementsByPeriod = elements.map((el) => [
    el[0],
    el[1].slice((year - 1) * periods, year * periods),
  ]);

  // sumar los intereses totales por periodo
  let sumElementsByPeriod = [];
  $: {
    if (elementsByPeriod.length > 0) {
      sumElementsByPeriod = elementsByPeriod.reduce((acc, curr) => {
        if (acc.length === 0) {
          return curr[1];
        } else {
          return acc.map((num, idx) => num + curr[1][idx]);
        }
      }, []);
    } else {
      sumElementsByPeriod = Array(periods).fill(0);
    }
  }

  $: totalMargin = Array(periods).fill(Math.round(totalIncome - totalExpenses)); // margen operacional
  let totalUtility = []; // utilidad antes de impuestos
  $: {
    totalUtility = [];
    if (sumElementsByPeriod.length > 0) {
      for (let i = 0; i < periods; i++) {
        totalUtility.push(Math.round(totalMargin[i] - sumElementsByPeriod[i]));
      }
    } else {
      totalUtility = Array(periods).fill(0);
    }
  }
  let totalTaxProvision = []; // provision de impuestos
  $: {
    totalTaxProvision = [];
    if (totalUtility.length > 0) {
      totalTaxProvision = totalUtility.map((el) =>
        Math.round(el * ($cashFlowOptionsData.taxProvision / 100))
      );
    }
  }

  let totalNetIncome = []; // utilidad neta
  $: {
    totalNetIncome = [];
    if (totalUtility.length > 0) {
      for (let i = 0; i < periods; i++) {
        totalNetIncome.push(Math.round(totalUtility[i] - totalTaxProvision[i]));
      }
    }
  }

  let totalNetCashFlow = []; // flujo de caja neto
  $: {
    totalNetCashFlow = [];
    if (totalUtility.length > 0) {
      for (let i = 0; i < periods; i++) {
        totalNetCashFlow.push(
          Math.round(
            totalNetIncome[i] + sumElementsByPeriod[i] + totalAmortization
          )
        );
      }
    }
  }
</script>

<div class="year-analysis">
  <div class="element-year-analysis">
    <div
      class="item-main-analysis"
      style="background-color: var(--color1); cursor: auto;"
    >
      <h4 class="title">Descripción</h4>
      {#each Array.from({ length: periods }, (_, i) => i + 1) as el}
        <h4>T{el}</h4>
      {/each}
    </div>
  </div>

  <div class="element-year-analysis">
    <div class="item-main-analysis" on:click={seeInFlows}>
      <h4 class="title">Flujo de entrada</h4>
      {#each Array(periods).fill(Math.round(totalIncome).toLocaleString()) as el}
        <h4>{el}</h4>
      {/each}
    </div>
    {#if viewInFlows}
      <div class="flow-list-analysis">
        {#each inflows as el}
          <div class="item item-secondary-analysis">
            <p class="title"><b>{el.description}</b></p>
            {#each Array(periods).fill(totalInFlow(el)) as d}
              <p>{d}</p>
            {/each}
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div class="element-year-analysis">
    <div class="item-main-analysis" on:click={seeOutFlows}>
      <h4 class="title">Flujo de salida</h4>
      {#each Array(periods).fill(Math.round(totalExpenses).toLocaleString()) as el}
        <h4>{el}</h4>
      {/each}
    </div>
    {#if viewOutFlows}
      <div class="flow-list-analysis">
        {#each outflows as el}
          <div class="item item-secondary-analysis">
            <p class="title"><b>{el.description}</b></p>
            {#each Array(periods).fill(totalOutFlow(el)) as d}
              <p>{d}</p>
            {/each}
          </div>
        {/each}
        <div class="item item-secondary-analysis">
          <p class="title"><b>Depreciación y amortización</b></p>
          {#each Array(periods).fill(totalAmortization.toLocaleString()) as d}
            <p>{d}</p>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <div class="element-year-analysis">
    <div class="item-main-analysis" on:click={seeExpenses}>
      <h4 class="title">Gastos financieros</h4>
      {#each sumElementsByPeriod as el}
        <h4>{Math.round(el).toLocaleString()}</h4>
      {/each}
    </div>
    {#if viewExpenses}
      <div class="flow-list-analysis">
        {#each elementsByPeriod as el}
          <div class="item item-secondary-analysis">
            <p class="title"><b>{el[0]}</b></p>
            {#each el[1] as d}
              <p>{Math.round(d).toLocaleString()}</p>
            {/each}
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <div class="element-year-analysis">
    <div class="item-main-analysis" on:click={seeNetIncome}>
      <h4 class="title">Utilidad Neta</h4>
      {#each totalNetIncome as el}
        <h4>{el.toLocaleString()}</h4>
      {/each}
    </div>
    {#if viewNetIncome}
      <div class="flow-list-analysis">
        <div class="item item-secondary-analysis">
          <p class="title"><b>Margen operacional</b></p>
          {#each totalMargin as el}
            <p>{el.toLocaleString()}</p>
          {/each}
        </div>
        <div class="item item-secondary-analysis">
          <p class="title"><b>Utilidad antes de impuestos</b></p>
          {#each totalUtility as el}
            <p>{el.toLocaleString()}</p>
          {/each}
        </div>
        <div class="item item-secondary-analysis">
          <p class="title"><b>Provisión de impuestos</b></p>
          {#each totalTaxProvision as el}
            <p>{el.toLocaleString()}</p>
          {/each}
        </div>
      </div>
    {/if}
  </div>

  <div class="element-year-analysis">
    <div
      class="item-main-analysis"
      style="background-color: #000; cursor: auto;"
    >
      <h4 class="title">Flujo de caja neto</h4>
      {#each totalNetCashFlow as el}
        <h4>{el.toLocaleString()}</h4>
      {/each}
    </div>
  </div>
</div>

<style>
  .year-analysis {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    min-width: max-content;
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

  .item-main-analysis {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    padding: 1rem;
    background-color: var(--color6);
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }

  .item-main-analysis h4 {
    margin: 0;
  }

  .item-secondary-analysis {
    display: flex;
    align-items: center;
    box-shadow: none;
    padding: 0.5rem;
  }

  .item-secondary-analysis p {
    margin: 5px;
  }

  h4,
  p {
    flex: 1;
  }

  .title {
    flex: 2;
  }
</style>
