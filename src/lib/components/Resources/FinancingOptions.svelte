<script>
  import { toast } from "svelte-easy-toast";
  //store
  import { financingOptionsData } from "../../store/store";
  //utils
  import { data } from "./../../utils/calculate";

  const keys = Object.keys(data);

  let term = 0; // plazo en meses para el financiamiento
  let periodicity = keys[0]; // periodicidad del financiamiento

  try {
    financingOptionsData.subscribe((data) => {
      term = data.term;
      periodicity = data.periodicity;
    });
  } catch (error) {
    console.error(error);
  }

  function updateFinancingOptions() {
    try {
      financingOptionsData.update(
        (data) =>
          (data = {
            term,
            periodicity,
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

<div class="financing-options">
  <h2>Opciones de financiamiento</h2>
  <div class="form-element">
    <label for="term">Plazo en meses</label>
    <input
      id="term"
      type="number"
      bind:value={term}
      placeholder="Plazo en meses"
      min="1"
      max="100"
    />
  </div>
  <div class="form-element">
    <label for="periodicity">Periodicidad</label>
    <select id="periodicity" bind:value={periodicity}>
      {#each keys as k}
        <option value={k}>{k}</option>
      {/each}
    </select>
  </div>
  <div class="save-data">
    <button on:click={updateFinancingOptions}>Guardar</button>
  </div>
</div>

<style>
  .financing-options {
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
