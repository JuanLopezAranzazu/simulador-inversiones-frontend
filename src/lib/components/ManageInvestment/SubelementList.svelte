<script>
  //components
  import Subelement from "./Subelement.svelte";
  export let subelements = [];
  export let updateSubelement;
  export let deleteSubelement;
  export let readonly = true;

  $: style = !readonly ? "margin-left: 1rem; gap: 0.25rem;" : "";
</script>

<div class="subelements-list" {style}>
  {#if readonly}
    <div class="title">
      <p>Lista de rubros</p>
    </div>
  {/if}
  {#each subelements as subelement}
    <Subelement {readonly} {subelement} {updateSubelement} {deleteSubelement} />
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
