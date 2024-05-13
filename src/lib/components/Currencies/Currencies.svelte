<!-- <script>
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
        <button type="button" on:click={closeModal}>Cancelar</button>
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
        <button type="button" on:click={closeWarningModal}>Aceptar</button>
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

  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 500px;
  }
</style> -->

<script>
  //store
  import { currencyData } from "./../../store/store";

  function findCurrency(currencyName) {
    return $currencyData.find((currency) => currency.name === currencyName)
      .value;
  }

  let value1 = findCurrency("USD");
  let value2 = findCurrency("EUR");

  function updateCurrency() {
    currencyData.update((data) => {
      const updatedData = data.map((currency) => {
        if (currency.name === "USD") {
          return { ...currency, value: value1 };
        } else if (currency.name === "EUR") {
          return { ...currency, value: value2 };
        }
        return currency;
      });
      return updatedData;
    });
  }
</script>

<div class="currencies">
  <h2>Monedas</h2>
  <div class="currency">
    <p>USD</p>
    <input type="number" bind:value={value1} />
  </div>
  <div class="currency">
    <p>EUR</p>
    <input type="number" bind:value={value2} />
  </div>
  <div class="save-data">
    <button type="button" on:click={() => updateCurrency()}>Guardar</button>
  </div>
</div>

<style>
  .currencies {
    display: flex;
    flex-direction: column;
    gap: 10px;
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

  .currency {
    display: flex;
    flex-direction: column;
  }
</style>
