<script>
  //components
  import Text from "./../Text.svelte";
  //store
  import {
    totalResourceByType1,
    totalResourceByType2,
  } from "../../store/store";

  $: total = $totalResourceByType1 + $totalResourceByType2;
</script>

<div class="resource-details">
  <div class="title">
    <h2>Detalles de financiación</h2>
  </div>
  <Text label="Total recursos" value={`${total.toLocaleString()}$`} />
  <Text
    label="Recursos propios"
    value={`${$totalResourceByType1.toLocaleString()}$`}
  />
  <Text
    label="Recursos externos"
    value={`${$totalResourceByType2.toLocaleString()}$`}
  />
</div>

<style>
  .resource-details {
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
