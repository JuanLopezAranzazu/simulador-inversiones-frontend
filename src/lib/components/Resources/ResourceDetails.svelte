<script>
  //utils
  import { calculateTotalResourceByType } from "./../../utils/calculate";
  //store
  import {
    resourceData,
    totalResourceByType1,
    totalResourceByType2,
  } from "../../store/store";

  // $: total1 = calculateTotalResourceByType($resourceData, "Propio");
  // $: total2 = calculateTotalResourceByType($resourceData, "Externo");
  // $: total3 = total1 + total2;

  $: total = $totalResourceByType1 + $totalResourceByType2;
</script>

<div class="resource-details">
  <h1>Detalles de financiación</h1>
  <p>Total recursos: ${total.toLocaleString()}</p>
  <p>Recursos propios: ${$totalResourceByType1.toLocaleString()}</p>
  <p>Recursos externos: ${$totalResourceByType2.toLocaleString()}</p>
</div>

<style>
  .resource-details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--color3);
    border-radius: 8px;
    padding: 10px;
  }
</style>
