<script>
  //components
  import Resource from "./Resource.svelte";
  import Search from "../Search.svelte";
  //utils
  import { searchItems } from "./../../utils/search";
  export let resources = [];
  export let updateResource;
  export let deleteResource;
  export let seeResource;

  let search = "";
  let filteredResources = resources;

  $: {
    if (search === "") {
      filteredResources = resources;
    } else {
      filteredResources = searchItems(resources, search);
    }
  }

  const handleSearch = (query) => {
    search = query;
  };
</script>

<div class="resource-list">
  <div class="resource-list-header">
    <span>Lista de recursos</span>
    <Search onSearch={handleSearch} />
  </div>
  {#each filteredResources as resource}
    <Resource {resource} {updateResource} {deleteResource} {seeResource} />
  {/each}
</div>

<style>
  .resource-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .resource-list-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color1);
    padding: 1rem;
    border-radius: 8px;
    color: #fff;
  }
</style>
