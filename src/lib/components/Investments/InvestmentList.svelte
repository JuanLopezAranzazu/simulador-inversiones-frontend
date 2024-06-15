<script>
  //components
  import Investment from "./Investment.svelte";
  import Search from "./../Elements/Search.svelte";
  //utils
  import { searchItems } from "./../../utils/search";
  export let investments = [];
  export let updateInvestment;
  export let deleteInvestment;

  let search = "";
  let filteredInvestments = investments;

  $: {
    if (search === "") {
      filteredInvestments = investments;
    } else {
      filteredInvestments = searchItems(investments, search);
    }
  }

  const handleSearch = (query) => {
    search = query;
  };
</script>

<div class="investment-list">
  <div class="investment-list-header">
    <span>Lista de inversiones</span>
    <Search onSearch={handleSearch} />
  </div>
  {#each filteredInvestments as investment}
    <Investment {investment} {updateInvestment} {deleteInvestment} />
  {/each}
</div>

<style>
  .investment-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .investment-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color1);
    padding: 1rem;
    border-radius: 8px;
    color: #fff;
  }
</style>
