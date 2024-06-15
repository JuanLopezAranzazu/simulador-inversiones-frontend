<script>
  import { toast } from "svelte-easy-toast";
  //store
  import { cashFlowOptionsData } from "../../store/store";

  let amortization = 0;
  let taxProvision = 0;

  try {
    cashFlowOptionsData.subscribe((data) => {
      amortization = data.amortization;
      taxProvision = data.taxProvision;
    });
  } catch (error) {
    console.error(error);
  }

  function updateCashFlowOptions() {
    try {
      cashFlowOptionsData.update(
        (data) =>
          (data = {
            amortization,
            taxProvision,
          })
      );
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

<div class="cash-flow-options">
  <h2>Opciones de flujo de caja</h2>
  <div class="form-element">
    <label for="amortization">Depreciación y amortización</label>
    <input
      id="amortization"
      type="number"
      bind:value={amortization}
      placeholder="Depreciación y amortización"
      min="1"
      max="100"
    />
  </div>
  <div class="form-element">
    <label for="taxProvision">Provisión de impuestos</label>
    <input
      id="taxProvision"
      type="number"
      bind:value={taxProvision}
      placeholder="Provisión de impuestos"
      min="1"
      max="100"
    />
  </div>
  <div class="save-data">
    <button on:click={updateCashFlowOptions}>Guardar</button>
  </div>
</div>

<style>
  .cash-flow-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 10px;
    border: 1px solid #a9a9a9;
    border-radius: 8px;
    background-color: var(--color3);
    box-shadow: 0px 0px 5px 0px #a9a9a9;
  }

  .save-data {
    display: flex;
    justify-content: center;
  }
</style>
