<script>
  //components
  import ModuleLayout from "../../lib/components/ModuleLayout.svelte";
  import Currencies from "../../lib/components/Currencies/Currencies.svelte";
  import Investments from "../../lib/components/Investments/Investments.svelte";
  import InvestmentDetails from "../../lib/components/Investments/InvestmentDetails.svelte";
</script>

<ModuleLayout>
  <div class="investment-module">
    <div class="investment-module-section">
      <Currencies />
      <InvestmentDetails />
    </div>
    <Investments />
  </div>
</ModuleLayout>

<style>
  .investment-module {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
  }

  .investment-module-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style>
