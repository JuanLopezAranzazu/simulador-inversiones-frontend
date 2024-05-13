<script>
  //components
  import Subelement from "./Subelement.svelte";
  export let subelements = [];
  export let updateSubelement;
  export let deleteSubelement;
</script>

<div class="subelements-list">
  <div class="title">
    <p>Lista de rubros</p>
  </div>
  {#each subelements as subelement}
    <Subelement {subelement} {updateSubelement} {deleteSubelement} />
  {/each}
</div>

<style>
  .subelements-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .title {
    display: flex;
    justify-content: center;
  }
</style>
