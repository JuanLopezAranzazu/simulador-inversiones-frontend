<script>
  //components
  import Subelement from "./Subelement.svelte";
  import Text from "../Text.svelte";
  //utils
  import { calculateTotalInvestment } from "./../../utils/calculate";
  //store
  import { currencyData } from "./../../store/store";
  export let subelements = [];
  export let updateSubelement;
  export let deleteSubelement;
  export let readonly = true;

  $: style = !readonly ? "margin-left: 1rem; gap: 0.25rem;" : "";
  $: subtotal = calculateTotalInvestment({ subelements }, $currencyData);
</script>

<div class="subelements-list" {style}>
  {#if readonly}
    <div class="title">
      <p>Lista de subcuentas</p>
    </div>
  {/if}
  {#each subelements as subelement}
    <Subelement {readonly} {subelement} {updateSubelement} {deleteSubelement} />
  {/each}
  {#if subelements.length > 0}
    <div class="item-subtotal">
      {#each [false, false, false, false, true].concat(readonly ? [false] : []) as x}
        {#if x}
          <Text label="Total parcial" value={subtotal.toLocaleString()} />
        {:else}
          <Text label="" value={""} />
        {/if}
      {/each}
    </div>
  {/if}
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

  .item-subtotal {
    display: flex;
    padding: 1rem;
  }
</style>
