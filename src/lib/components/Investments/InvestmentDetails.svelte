<script>
  //components
  import Text from "./../Elements/Text.svelte";
  //store
  import {
    totalInvestmentByType1,
    totalInvestmentByType2,
  } from "../../store/store";

  $: total = $totalInvestmentByType1 + $totalInvestmentByType2;
</script>

<div class="investment-details">
  <div class="title">
    <h2>Detalles de inversión</h2>
  </div>
  <Text label="Total inversiones" value={`${total.toLocaleString()}$`} />
  <Text
    label="Inversiones fijas"
    value={`${$totalInvestmentByType1.toLocaleString()}$`}
  />
  <Text
    label="Inversiones variables"
    value={`${$totalInvestmentByType2.toLocaleString()}$`}
  />
</div>

<style>
  .investment-details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #a9a9a9;
    border-radius: 8px;
    background-color: var(--color3);
    box-shadow: 0px 0px 5px 0px #a9a9a9;
  }

  .title {
    display: flex;
    justify-content: center;
  }
</style>
