<script>
  //components
  import Resource from "./Resource.svelte";
  export let resources = [];
  export let updateResource;
  export let deleteResource;
  export let seeResource;
</script>

<div class="resource-list">
  <div class="title">
    <p>Lista de recursos</p>
  </div>
  {#each resources as resource}
    <Resource {resource} {updateResource} {deleteResource} {seeResource} />
  {/each}
</div>

<style>
  .resource-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .title {
    display: flex;
    justify-content: center;
  }
</style>
