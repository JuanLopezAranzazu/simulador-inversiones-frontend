<!-- <script>
  export let component;
  export let items;
  export let keys;
  export let updateItem;
  export let deleteItem;
</script>

<div class="investment-list">
  {#if items.length === 0}
    <p>No hay inversiones</p>
  {:else}
    {#each items as item}
      <svelte:component
        this={component}
        {item}
        {keys}
        {updateItem}
        {deleteItem}
      />
    {/each}
  {/if}
</div>

<style>
  .investment-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
</style> -->

<script>
  //components
  import Investment from "./Investment.svelte";
  export let investments = [];
  export let updateInvestment;
  export let deleteInvestment;
</script>

<div class="investment-list">
  <div class="title">
    <p>Lista de inversiones</p>
  </div>
  {#each investments as investment}
    <Investment {investment} {updateInvestment} {deleteInvestment} />
  {/each}
</div>

<style>
  .investment-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .title {
    display: flex;
    justify-content: center;
  }
</style>
