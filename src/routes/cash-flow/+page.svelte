<script>
  //components
  import ModuleLayout from "../../lib/components/Elements/ModuleLayout.svelte";
  import Flows from "../../lib/components/CashFlow/Flows.svelte";
  import CashFlowAnalysis from "../../lib/components/CashFlow/CashFlowAnalysis.svelte";
  import GrowthFactor from "../../lib/components/CashFlow/GrowthFactor.svelte";
  import CashFlowOptions from "../../lib/components/CashFlow/CashFlowOptions.svelte";
</script>

<ModuleLayout>
  <div class="cash-flow-module">
    <div class="cash-flow-module-section">
      <GrowthFactor />
      <CashFlowOptions />
      <CashFlowAnalysis />
    </div>
    <Flows />
  </div>
</ModuleLayout>

<style>
  .cash-flow-module {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
  }

  .cash-flow-module-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
