<script>
  //utils
  import {
    data,
    calculateNominalRate,
    calculatePeriodicRate,
  } from "./../utils/calculate";
  export let item;
  let { value, rate, term, periodicity } = item;

  let periods;
  let nominalRate;
  let periodicRate;
  let pay;
  let elements;

  $: {
    periods = data[periodicity];
    nominalRate = calculateNominalRate(rate, periods);
    periodicRate = calculatePeriodicRate(nominalRate, periods);
    pay = value / term;
    elements = [[0, 0, 0, 0, value]];

    for (let i = 0; i < term; i++) {
      const interest = value * periodicRate;
      const data = [i + 1, pay, interest, pay + interest, value - pay];
      value -= pay;
      elements.push(data);
    }
  }
</script>

<table>
  <thead>
    <tr>
      <th>No</th>
      <th>Cuota</th>
      <th>Interes</th>
      <th>Pago</th>
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

<style>
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
