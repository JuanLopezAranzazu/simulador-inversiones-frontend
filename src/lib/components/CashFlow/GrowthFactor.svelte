<script>
  import { SvelteEasyToast, toast } from "svelte-easy-toast";
  //components
  import Modal from "../Modal.svelte";
  //store
  import { growthFactorData } from "../../store/store";

  let showModal = false;
  let units = 0; // crecimiento por unidades
  let prices = 0; // crecimiento por precios
  let costs = 0; // crecimiento por costos

  try {
    growthFactorData.subscribe((data) => {
      units = data.units;
      prices = data.prices;
      costs = data.costs;
    });
  } catch (error) {
    console.error(error);
  }

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function updateGrowthFactor() {
    try {
      growthFactorData.update(
        (data) =>
          (data = {
            units,
            prices,
            costs,
          })
      );
      closeModal();
      toast({
        type: "success",
        position: "bottom-right",
        text: "Se ha actualizado las variables correctamente!",
        title: "Variables actualizadas",
        delay: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  }
</script>

<div class="growth-factor">
  <h2>Factor de crecimiento</h2>
  <div class="see-data">
    <button on:click={openModal}>Ajustar</button>
  </div>

  {#if showModal}
    <Modal>
      <div class="modal-header">
        <h2>Factor de crecimiento</h2>
      </div>
      <div class="modal-content">
        <div class="form-element">
          <label for="units">Crecimiento por unidades</label>
          <input
            id="units"
            type="number"
            bind:value={units}
            placeholder="Crecimiento por unidades"
            min="0"
            max="100"
          />
        </div>
        <div class="form-element">
          <label for="prices">Crecimiento por precios</label>
          <input
            id="prices"
            type="number"
            bind:value={prices}
            placeholder="Crecimiento por precios"
            min="0"
            max="100"
          />
        </div>
        <div class="form-element">
          <label for="costs">Crecimiento por costos</label>
          <input
            id="costs"
            type="number"
            bind:value={costs}
            placeholder="Crecimiento por costos"
            min="0"
            max="100"
          />
        </div>
      </div>
      <div class="modal-footer">
        <button on:click={closeModal}>Cancelar</button>
        <button on:click={updateGrowthFactor}>Guardar</button>
      </div>
    </Modal>
  {/if}
</div>

<SvelteEasyToast />

<style>
  .growth-factor {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 10px;
    border: 1px solid #a9a9a9;
    border-radius: 8px;
    background-color: var(--color3);
    box-shadow: 0px 0px 5px 0px #a9a9a9;
  }

  .see-data {
    display: flex;
    justify-content: center;
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
