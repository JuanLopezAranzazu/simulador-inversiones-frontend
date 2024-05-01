<script>
  //store
  import { resourceData } from "../../store/store";

  function calculateTotalByType(resources, type) {
    return resources
      .filter((resource) => resource.type === type)
      .reduce((total, resource) => total + resource.value, 0);
  }

  $: total1 = calculateTotalByType($resourceData, "Propio");
  $: total2 = calculateTotalByType($resourceData, "Externo");
</script>

<div class="resource-details">
  <h1>Detalles de financiación</h1>

  <p>Recursos propios: ${total1.toLocaleString()}</p>
  <p>Recursos externos: ${total2.toLocaleString()}</p>
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
