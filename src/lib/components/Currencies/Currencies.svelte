<script>
  import { v4 as uuidv4 } from "uuid";
  //components
  import CurrencyList from "./CurrencyList.svelte";
  import Currency from "./Currency.svelte";
  import Modal from "./../Modal.svelte";
  import Input from "./../Input.svelte";
  //store
  import { currencyData, investmentData } from "./../../store/store";

  let showModal = false;
  let showWarningModal = false;
  let selectedCurrency = null;
  let name = "";
  let value = 0;

  function resetFields() {
    name = "";
    value = 0;
    selectedCurrency = null;
  }

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function openWarningModal() {
    showWarningModal = true;
  }

  function closeWarningModal() {
    showWarningModal = false;
  }

  function createCurrency(newCurrency) {
    currencyData.update((data) => [...data, { _id: uuidv4(), ...newCurrency }]);
    closeModal();
  }

  function updateCurrency(updatedCurrency) {
    currencyData.update((data) =>
      data.map((currency) =>
        currency._id === selectedCurrency._id
          ? { ...currency, ...updatedCurrency }
          : currency
      )
    );
    closeModal();
  }

  function deleteCurrency(currencyId) {
    if (
      $investmentData.some(
        (investment) => investment.currency._id === currencyId
      )
    ) {
      openWarningModal();
      return;
    }
    currencyData.update((data) =>
      data.filter((currency) => currency._id !== currencyId)
    );
  }
</script>

<div class="currencies">
  <CurrencyList
    items={$currencyData}
    component={Currency}
    keys={["name", "value"]}
    updateItem={(currency) => {
      selectedCurrency = currency;
      name = currency.name;
      value = currency.value;
      openModal();
    }}
    deleteItem={deleteCurrency}
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
        <h2>{selectedCurrency ? "Editar" : "Crear"} Moneda</h2>
      </div>
      <div class="modal-content">
        <input type="text" bind:value={name} placeholder="Nombre" />
        <input type="number" bind:value placeholder="Valor" />
      </div>
      <div class="modal-footer">
        <button on:click={closeModal}>Cancelar</button>
        <button
          type="button"
          on:click={selectedCurrency
            ? updateCurrency({ name, value })
            : createCurrency({ name, value })}
          >{selectedCurrency ? "Editar" : "Crear"}</button
        >
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
          No se puede eliminar esta moneda porque está siendo utilizada en una
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
  .currencies {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: var(--color3);
    border-radius: 8px;
    padding: 10px;
  }
</style>
