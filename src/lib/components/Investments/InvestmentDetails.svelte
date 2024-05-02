<script>
  //utils
  import { calculateTotalInvestmentByType } from "./../../utils/calculate";
  //store
  import {
    investmentData,
    totalInvestmentByType1,
    totalInvestmentByType2,
  } from "../../store/store";

  // $: total1 = calculateTotalInvestmentByType($investmentData, "Fija");
  // $: total2 = calculateTotalInvestmentByType($investmentData, "Variable");
  // $: total3 = total1 + total2;

  $: total = $totalInvestmentByType1 + $totalInvestmentByType2;
</script>

<div class="investment-details">
  <h1>Detalles de inversión</h1>
  <p>Total inversiones: ${total.toLocaleString()}</p>
  <p>Inversiones fijas: ${$totalInvestmentByType1.toLocaleString()}</p>
  <p>Inversiones variables: ${$totalInvestmentByType2.toLocaleString()}</p>
</div>

<style>
  .investment-details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--color3);
    border-radius: 8px;
    padding: 10px;
  }
</style>
