<script>
  //components
  import Flow from "./Flow.svelte";
  import Search from "./../Elements/Search.svelte";
  //utils
  import { searchItems } from "./../../utils/search";
  export let flows = [];
  export let updateCashFlow;
  export let deleteCashFlow;

  let search = "";
  let filteredFlows = flows;

  $: {
    if (search === "") {
      filteredFlows = flows;
    } else {
      filteredFlows = searchItems(flows, search);
    }
  }

  const handleSearch = (query) => {
    search = query;
  };
</script>

<div class="flow-list">
  <div class="flow-list-header">
    <span>Lista de flujos</span>
    <Search onSearch={handleSearch} />
  </div>
  {#each filteredFlows as flow}
    <Flow {flow} {updateCashFlow} {deleteCashFlow} />
  {/each}
</div>

<style>
  .flow-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .flow-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color1);
    padding: 1rem;
    border-radius: 8px;
    color: #fff;
  }
</style>
