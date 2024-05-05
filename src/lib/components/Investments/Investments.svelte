<script>
  import { v4 as uuidv4 } from "uuid";
  //components
  import InvestmentList from "./InvestmentList.svelte";
  import Investment from "./Investment.svelte";
  import Modal from "./../Modal.svelte";
  import Input from "./../Input.svelte";
  //store
  import { currencyData, investmentData } from "./../../store/store";

  const types = ["Fija", "Variable"];

  let showModal = false;
  let selectedInvestment = null;
  let description = "";
  let price = 0;
  let qty = 0;
  let type = types[0];
  let currency = $currencyData[0]._id;
  let filteredElements = [];
  let selectedType = "";

  function resetFields() {
    description = "";
    price = 0;
    qty = 0;
    type = types[0];
    currency = $currencyData[0]._id;
    selectedInvestment = null;
  }

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function createInvestment(newInvestment) {
    const { currency } = newInvestment;
    const c = $currencyData.find((c) => c._id === currency);
    investmentData.update((data) => [
      ...data,
      { _id: uuidv4(), ...newInvestment, currency: c },
    ]);
    closeModal();
  }

  function updateInvestment(updatedInvestment) {
    const { currency } = updatedInvestment;
    const c = $currencyData.find((c) => c._id === currency);
    investmentData.update((data) =>
      data.map((investment) =>
        investment._id === selectedInvestment._id
          ? { ...investment, ...updatedInvestment, currency: c }
          : investment
      )
    );
    closeModal();
  }

  function deleteInvestment(investmentId) {
    investmentData.update((data) =>
      data.filter((investment) => investment._id !== investmentId)
    );
  }

  $: filteredElements =
    selectedType === ""
      ? $investmentData
      : $investmentData.filter(
          (investment) => investment.type === selectedType
        );
</script>

<div class="investments">
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
      class:active={selectedType === "Fija"}
      on:click={() => {
        selectedType = "Fija";
      }}
    >
      Fija
    </button>
    <button
      class:active={selectedType === "Variable"}
      on:click={() => {
        selectedType = "Variable";
      }}
    >
      Variable
    </button>
  </div>

  <InvestmentList
    items={filteredElements}
    component={Investment}
    keys={["description", "price", "qty", "type"]}
    updateItem={(investment) => {
      selectedInvestment = investment;
      description = investment.description;
      price = investment.price;
      qty = investment.qty;
      type = investment.type;
      currency = investment.currency._id;
      openModal();
    }}
    deleteItem={deleteInvestment}
  />
  <button
    on:click={() => {
      resetFields();
      openModal();
    }}>Crear Inversión</button
  >

  {#if showModal}
    <Modal>
      <div class="modal-header">
        <h2>{selectedInvestment ? "Editar" : "Crear"} Inversión</h2>
      </div>
      <div class="modal-content">
        <input type="text" bind:value={description} placeholder="Descripción" />
        <input type="number" bind:value={price} placeholder="Precio" />
        <input type="number" bind:value={qty} placeholder="Cantidad" />
        <select bind:value={type}>
          {#each types as t}
            <option value={t}>{t}</option>
          {/each}
        </select>
        <select bind:value={currency}>
          {#each $currencyData as c}
            <option value={c._id}>{c.name}</option>
          {/each}
        </select>
      </div>
      <div class="modal-footer">
        <button on:click={closeModal}>Cancelar</button>
        <button
          type="button"
          on:click={selectedInvestment
            ? updateInvestment({ description, price, qty, type, currency })
            : createInvestment({ description, price, qty, type, currency })}
          >{selectedInvestment ? "Editar" : "Crear"}</button
        >
      </div>
    </Modal>
  {/if}
</div>

<style>
  .investments {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
