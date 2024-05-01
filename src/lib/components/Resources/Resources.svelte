<script>
  import { v4 as uuidv4 } from "uuid";
  //components
  import ResourceList from "./ResourceList.svelte";
  import Resource from "./Resource.svelte";
  import Modal from "./../Modal.svelte";
  import Input from "./../Input.svelte";
  //store
  import { resourceData } from "./../../store/store";

  const types = ["Propio", "Externo"];
  const typesPeriodicity = [
    "Mensual",
    "Bimestral",
    "Trimestral",
    "Cuatrimestral",
    "Semestral",
  ];

  let showModal = false;
  let selectedResource = null;
  let description = "";
  let value = 0;
  let rate = 0;
  let term = 0;
  let periodicity = typesPeriodicity[0];
  let type = types[0];

  function resetFields() {
    description = "";
    value = 0;
    rate = 0;
    term = 0;
    periodicity = typesPeriodicity[0];
    type = types[0];
    selectedResource = null;
  }

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function createResource(newResource) {
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
</script>

<div class="resources">
  <ResourceList
    items={$resourceData}
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
  />
  <button
    on:click={() => {
      resetFields();
      openModal();
    }}>Crear Moneda</button
  >

  {#if showModal}
    <Modal>
      <div class="modal-header">
        <h2>{selectedResource ? "Editar" : "Crear"} Inversión</h2>
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
          {#each typesPeriodicity as p}
            <option value={p}>{p}</option>
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
</div>

<style>
  .resources {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
