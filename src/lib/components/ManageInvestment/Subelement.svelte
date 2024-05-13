<script>
  //components
  import Text from "./../Text.svelte";
  export let subelement;
  export let updateSubelement;
  export let deleteSubelement;
</script>

<div class="item">
  <div class="subelement-info">
    <Text label="Descripción" value={subelement.descriptionSubelement} />
    <Text label="Precio" value={subelement.price} />
    <Text label="Cantidad" value={subelement.qty} />
  </div>
  <div class="subelement-actions">
    <button type="button" on:click={() => updateSubelement(subelement)}
      >Editar</button
    >
    <button
      type="button"
      class="delete"
      on:click={() => deleteSubelement(subelement._id)}>Eliminar</button
    >
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
    gap: 1rem;
  }
</style>
