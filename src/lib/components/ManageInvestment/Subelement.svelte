<script>
  //components
  import Text from "./../Text.svelte";
  //stores
  import { currencyData } from "./../../store/store";
  //utils
  import { calculateTotalSubelement } from "./../../utils/calculate";
  export let subelement;
  export let updateSubelement;
  export let deleteSubelement;
  export let readonly = true;

  $: currency = $currencyData.find(
    (currency) => currency._id == subelement.currency
  );
  $: total = calculateTotalSubelement(subelement, currency.value);
</script>

<div class={`item ${!readonly && "item-alt"}`}>
  <div class="subelement-info">
    <Text label="Descripción" value={subelement.descriptionSubelement} />
    <Text label="Precio" value={subelement.price.toLocaleString()} />
    <Text label="Cantidad" value={subelement.qty.toLocaleString()} />
    <Text label="Moneda" value={currency.name} />
    <Text label="Total" value={total.toLocaleString()} />
  </div>
  <div class="subelement-actions">
    {#if readonly}
      <button type="button" on:click={() => updateSubelement(subelement)}
        >Editar</button
      >
      <button
        type="button"
        class="delete"
        on:click={() => deleteSubelement(subelement._id)}>Eliminar</button
      >
    {/if}
  </div>
</div>

<style>
  .subelement-info {
    display: flex;
    gap: 1rem;
    flex: 1;
  }

  .subelement-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
  }
</style>
