<script>
  import { v4 as uuidv4 } from "uuid";
  //components
  import ResourceList from "./ResourceList.svelte";
  import Resource from "./Resource.svelte";
  import Modal from "./../Modal.svelte";
  import Input from "./../Input.svelte";
  import Table from "./../Table.svelte";
  //store
  import { resourceData, investmentData } from "./../../store/store";
  //utils
  import { data } from "./../../utils/calculate";

  const types = ["Propio", "Externo"];
  const keys = Object.keys(data);

  let showModal = false;
  let showTableModal = false;
  let showWarningModal = false;
  let selectedResource = null;
  let description = "";
  let value = 0;
  let rate = 0;
  let term = 0;
  let periodicity = keys[0];
  let type = types[0];
  let filteredElements = [];
  let selectedType = "";

  function resetFields() {
    description = "";
    value = 0;
    rate = 0;
    term = 0;
    periodicity = keys[0];
    type = types[0];
    selectedResource = null;
  }

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function openTableModal() {
    showTableModal = true;
  }

  function closeTableModal() {
    showTableModal = false;
  }

  function openWarningModal() {
    showWarningModal = true;
  }

  function closeWarningModal() {
    showWarningModal = false;
  }
  function createResource(newResource) {
    const total1 = $investmentData.reduce(
      (acc, investment) =>
        acc + investment.price * investment.qty * investment.currency.value,
      0
    );
    const total2 = $resourceData.reduce(
      (acc, resource) => acc + resource.value,
      0
    );
    const { value } = newResource;
    if (total2 + value > total1) {
      openWarningModal();
      return;
    }
    resourceData.update((data) => [...data, { _id: uuidv4(), ...newResource }]);
    closeModal();
  }

  function updateResource(updatedResource) {
    resourceData.update((data) =>
      data.map((resource) =>
        resource._id === selectedResource._id
          ? { ...resource, ...updatedResource }
          : resource
      )
    );
    closeModal();
  }

  function deleteResource(resourceId) {
    resourceData.update((data) =>
      data.filter((resource) => resource._id !== resourceId)
    );
  }

  $: filteredElements =
    selectedType === ""
      ? $resourceData
      : $resourceData.filter((resource) => resource.type === selectedType);
</script>

<div class="resources">
  <div class="options">
    <button
      class:active={selectedType === ""}
      on:click={() => {
        selectedType = "";
      }}
    >
      Todos
    </button>
    <button
      class:active={selectedType === "Propio"}
      on:click={() => {
        selectedType = "Propio";
      }}
    >
      Propio
    </button>
    <button
      class:active={selectedType === "Externo"}
      on:click={() => {
        selectedType = "Externo";
      }}
    >
      Externo
    </button>
  </div>

  <ResourceList
    items={filteredElements}
    component={Resource}
    keys={["description", "value", "rate", "term", "periodicity", "type"]}
    updateItem={(resource) => {
      selectedResource = resource;
      description = resource.description;
      value = resource.value;
      rate = resource.rate;
      term = resource.term;
      periodicity = resource.periodicity;
      type = resource.type;
      openModal();
    }}
    deleteItem={deleteResource}
    seeItem={(resource) => {
      selectedResource = resource;
      openTableModal();
    }}
  />
  <button
    on:click={() => {
      resetFields();
      openModal();
    }}>Crear Recurso</button
  >

  {#if showModal}
    <Modal>
      <div class="modal-header">
        <h2>{selectedResource ? "Editar" : "Crear"} Recurso</h2>
      </div>
      <div class="modal-content">
        <input type="text" bind:value={description} placeholder="Descripción" />
        <input type="number" bind:value placeholder="Capital" />
        <input
          type="number"
          bind:value={rate}
          placeholder="Tasa efectiva anual"
        />
        <input type="number" bind:value={term} placeholder="Plazo en meses" />
        <select bind:value={periodicity}>
          {#each keys as k}
            <option value={k}>{k}</option>
          {/each}
        </select>
        <select bind:value={type}>
          {#each types as t}
            <option value={t}>{t}</option>
          {/each}
        </select>
      </div>
      <div class="modal-footer">
        <button on:click={closeModal}>Cancelar</button>
        <button
          type="button"
          on:click={selectedResource
            ? updateResource({
                description,
                value,
                rate,
                term,
                periodicity,
                type,
              })
            : createResource({
                description,
                value,
                rate,
                term,
                periodicity,
                type,
              })}>{selectedResource ? "Editar" : "Crear"}</button
        >
      </div>
    </Modal>
  {/if}

  {#if showTableModal}
    <Modal>
      <div class="modal-header">
        <h2>Tabla de Amortización</h2>
      </div>
      <div class="modal-content">
        <Table item={selectedResource} />
      </div>
      <div class="modal-footer">
        <button on:click={closeTableModal}>Cerrar</button>
      </div>
    </Modal>
  {/if}

  {#if showWarningModal}
    <Modal>
      <div class="modal-header">
        <h2>Advertencia</h2>
      </div>
      <div class="modal-content">
        <p>
          No se puede crear este recurso porque está superando el total de
          inversión.
        </p>
      </div>
      <div class="modal-footer">
        <button on:click={closeWarningModal}>Aceptar</button>
      </div>
    </Modal>
  {/if}
</div>

<style>
  .resources {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .modal-content {
    overflow-y: auto;
    max-height: 300px;
  }

  .options {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  .active {
    background-color: var(--color2);
  }
</style>
