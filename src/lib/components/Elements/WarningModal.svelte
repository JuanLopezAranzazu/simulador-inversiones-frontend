<script>
  //components
  import Modal from "./Modal.svelte";
  export let state = false;
  export let title = "";
  export let message = "";
  export let show = false;
  export let close = () => {};
  export let confirm = () => {};
</script>

{#if show}
  <Modal>
    <div class="modal-header">
      <h2>{title}</h2>
    </div>
    <div class="modal-content">
      <p>{message}</p>
    </div>
    <div class="modal-footer">
      {#if state}
        <button type="button" on:click={() => close()}>Cancelar</button>
        <button
          type="button"
          on:click={() => {
            confirm();
            close();
          }}>Aceptar</button
        >
      {:else}
        <button type="button" on:click={() => close()}>Aceptar</button>
      {/if}
    </div>
  </Modal>
{/if}

<style>
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
    max-height: 300px;
    min-width: 500px;
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
</style>
