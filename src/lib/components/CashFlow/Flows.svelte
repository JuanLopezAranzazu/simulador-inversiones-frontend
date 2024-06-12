<script>
  import { v4 as uuidv4 } from "uuid";
  import { toast } from "svelte-easy-toast";
  //components
  import FlowList from "./FlowList.svelte";
  import Modal from "./../Modal.svelte";
  import Input from "./../Input.svelte";
  //store
  import { cashFlowData } from "./../../store/store";

  const flowTypes = ["Flujo de entrada", "Flujo de salida"];
  const outputTypes = ["Costo de operación", "Gastos operacionales"];

  let showModal = false;
  let selectedCashFlow = null;
  let description = "";
  let value = 0; // precio o porcentaje
  let qty = 0; // la cantidad de unidades para los flujos de entrada
  let flowType = flowTypes[0];
  let outputType = outputTypes[0]; // tipo de egreso para los flujos de salida
  let filteredElements = [];
  let selectedType = "";

  function resetFields() {
    description = "";
    value = 0;
    flowType = flowTypes[0];
    outputType = outputTypes[0];
    qty = 0;
    selectedCashFlow = null;
  }

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function createCashFlow(newCashFlow) {
    try {
      cashFlowData.update((data) => [
        ...data,
        { _id: uuidv4(), ...newCashFlow },
      ]);
      closeModal();
      toast({
        type: "success",
        position: "bottom-right",
        text: "Se ha creado el flujo de caja correctamente!",
        title: "Flujo de caja creado",
        delay: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function updateCashFlow(updatedCashFlow) {
    try {
      cashFlowData.update((data) =>
        data.map((cashFlow) =>
          cashFlow._id === selectedCashFlow._id
            ? { _id: cashFlow._id, ...updatedCashFlow }
            : cashFlow
        )
      );
      closeModal();
      toast({
        type: "success",
        position: "bottom-right",
        text: "Se ha actualizado el flujo de caja correctamente!",
        title: "Flujo de caja actualizado",
        delay: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function deleteCashFlow(resourceId) {
    try {
      cashFlowData.update((data) =>
        data.filter((resource) => resource._id !== resourceId)
      );
      toast({
        type: "success",
        position: "bottom-right",
        text: "Se ha eliminado el recurso correctamente!",
        title: "Recurso eliminado",
        delay: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  }

  $: filteredElements =
    selectedType === ""
      ? $cashFlowData
      : $cashFlowData.filter((cashFlow) => cashFlow.flowType === selectedType);
</script>

<div class="cash-flows">
  <div class="options">
    <button
      class:active={selectedType === ""}
      on:click={() => {
        selectedType = "";
      }}
    >
      Todos los flujos
    </button>
    <button
      class:active={selectedType === "Flujo de entrada"}
      on:click={() => {
        selectedType = "Flujo de entrada";
      }}
    >
      Flujo de entrada
    </button>
    <button
      class:active={selectedType === "Flujo de salida"}
      on:click={() => {
        selectedType = "Flujo de salida";
      }}
    >
      Flujo de salida
    </button>
  </div>

  <div class="save-data">
    <button
      on:click={() => {
        resetFields();
        openModal();
      }}>Crear Flujo</button
    >
  </div>

  <FlowList
    flows={filteredElements}
    updateCashFlow={(cashFlow) => {
      selectedCashFlow = cashFlow;
      description = cashFlow.description;
      value = cashFlow.value;
      flowType = cashFlow.flowType;
      if (cashFlow.flowType === "Flujo de entrada") {
        qty = cashFlow.qty;
      } else {
        outputType = cashFlow.outputType;
      }
      openModal();
    }}
    {deleteCashFlow}
  />

  {#if showModal}
    <Modal>
      <div class="modal-header">
        <h2>{selectedCashFlow ? "Editar" : "Crear"} Flujo</h2>
      </div>
      <div class="modal-content">
        <div class="form-element">
          <label for="description">Descripción</label>
          <input
            id="description"
            type="text"
            bind:value={description}
            placeholder="Descripción"
          />
        </div>
        <div class="form-element">
          <label for="value">Precio / Porcentaje</label>
          <input
            id="value"
            type="number"
            bind:value
            placeholder="Precio / Porcentaje"
          />
        </div>
        <div class="form-element">
          <label for="flowType">Tipo de flujo</label>
          <select id="flowType" bind:value={flowType}>
            {#each flowTypes as t}
              <option value={t}>{t}</option>
            {/each}
          </select>
        </div>
        {#if flowType === "Flujo de entrada"}
          <div class="form-element">
            <label for="qty">Cantidad de unidades</label>
            <input
              id="qty"
              type="number"
              bind:value={qty}
              placeholder="Cantidad de unidades"
            />
          </div>
        {:else}
          <div class="form-element">
            <label for="outputType">Tipo de egreso</label>
            <select id="outputType" bind:value={outputType}>
              {#each outputTypes as t}
                <option value={t}>{t}</option>
              {/each}
            </select>
          </div>
        {/if}
      </div>
      <div class="modal-footer">
        <button on:click={closeModal}>Cancelar</button>
        <button
          type="button"
          on:click={() => {
            const elementData = {
              description,
              flowType,
              value,
            };
            if (flowType === "Flujo de entrada") {
              elementData.qty = qty;
            } else {
              elementData.outputType = outputType;
            }
            selectedCashFlow
              ? updateCashFlow(elementData)
              : createCashFlow(elementData);
          }}>{selectedCashFlow ? "Editar" : "Crear"}</button
        >
      </div>
    </Modal>
  {/if}
</div>

<style>
  .cash-flows {
    display: flex;
    flex-direction: column;
    gap: 10px;
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

  .options {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .active {
    background-color: var(--color2);
  }

  .save-data {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }
</style>
