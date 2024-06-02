<script>
  //components
  import ModuleLayout from "../../lib/components/ModuleLayout.svelte";
  import Resources from "../../lib/components/Resources/Resources.svelte";
  import ResourceDetails from "../../lib/components/Resources/ResourceDetails.svelte";
  import FinancingAnalysis from "../../lib/components/Resources/FinancingAnalysis.svelte";
  import FinancingOptions from "../../lib/components/Resources/FinancingOptions.svelte";
</script>

<ModuleLayout>
  <div class="resource-module">
    <div class="resource-module-section">
      <ResourceDetails />
      <FinancingOptions />
      <FinancingAnalysis />
    </div>
    <Resources />
  </div>
</ModuleLayout>

<style>
  .resource-module {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
  }

  .resource-module-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
