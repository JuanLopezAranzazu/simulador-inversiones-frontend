<script>
  //store
  import { financingOptionsData } from "./../../store/store";
  //utils
  import {
    data,
    calculateNominalRate,
    calculatePeriodicRate,
    calculateShare,
  } from "./../../utils/calculate";
  export let item;
  let { value, rate } = item;

  let copyValue = value;
  let nominalRate;
  let periodicRate;
  let pay;
  let share;
  let elements;
  let selectedType = "Tabla de amortización 1";
  const periods = data[$financingOptionsData.periodicity];
  const term = $financingOptionsData.term;

  $: {
    nominalRate = calculateNominalRate(rate, periods);
    periodicRate = calculatePeriodicRate(nominalRate, periods);
    copyValue = value;
    elements = [[0, 0, 0, 0, Math.round(copyValue).toLocaleString()]];

    if (selectedType === "Tabla de amortización 1") {
      share = calculateShare(copyValue, periodicRate, term);
      for (let i = 0; i < term; i++) {
        const interest = copyValue * periodicRate;
        const pay = share - interest;
        copyValue -= pay;
        const data = [i + 1, share, interest, pay, copyValue].map((el) =>
          Math.round(el).toLocaleString()
        );
        elements.push(data);
      }
    } else {
      pay = copyValue / term;
      for (let i = 0; i < term; i++) {
        const interest = copyValue * periodicRate;
        copyValue -= pay;
        const data = [i + 1, pay, interest, pay + interest, copyValue].map(
          (el) => Math.round(el).toLocaleString()
        );
        elements.push(data);
      }
    }
  }
</script>

<div class="table-content">
  <div class="options">
    <button
      class:active={selectedType === "Tabla de amortización 1"}
      on:click={() => {
        selectedType = "Tabla de amortización 1";
      }}
    >
      Tabla de amortización 1
    </button>
    <button
      class:active={selectedType === "Tabla de amortización 2"}
      on:click={() => {
        selectedType = "Tabla de amortización 2";
      }}
    >
      Tabla de amortización 2
    </button>
  </div>
  <table>
    <thead>
      <tr>
        <th>No</th>
        <th>Cuota</th>
        <th>Interes</th>
        <th
          >{selectedType === "Tabla de amortización 1"
            ? "Abono a capital"
            : "Pago"}</th
        >
        <th>Saldo</th>
      </tr>
    </thead>
    <tbody>
      {#each elements as el}
        <tr>
          {#each el as data}
            <td>{data}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .options {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .active {
    background-color: var(--color2);
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  th,
  td {
    border: 1px solid #ddd;
    padding: 12px;
    text-align: center;
    background-color: #fff;
  }

  th {
    background-color: #14213d;
    color: white;
  }
</style>
