<script>
  import { goto } from "$app/navigation";
  import { v4 as uuidv4 } from "uuid";
  import { writable } from "svelte/store";
  //components
  import ModuleLayout from "../../lib/components/ModuleLayout.svelte";
  import SubelementList from "../../lib/components/ManageInvestment/SubelementList.svelte";
  //store
  import {
    currencyData,
    investmentData,
    selectedInvestment,
  } from "./../../lib/store/store";
  import { calculateTotalInvestment } from "../../lib/utils/calculate";

  const types = ["Fija", "Variable"];

  if (
    $selectedInvestment !== null &&
    !$investmentData.some(
      (investment) => investment._id === $selectedInvestment._id
    )
  ) {
    selectedInvestment.update((data) => (data = null));
  }

  //set initial values
  let subelements = writable(
    $selectedInvestment ? $selectedInvestment.subelements : []
  );
  let description = $selectedInvestment ? $selectedInvestment.description : "";
  let type = $selectedInvestment ? $selectedInvestment.type : types[0];
  let multiplier = $selectedInvestment ? $selectedInvestment.multiplier : 1;
  let descriptionSubelement = "";
  let price = 0;
  let qty = 0;
  let currency = $currencyData[0]._id;
  let selectedSubelement = null;

  function resetFields() {
    descriptionSubelement = "";
    price = 0;
    qty = 0;
    currency = $currencyData[0]._id;
    selectedSubelement = null;
  }

  function createElement(newElement) {
    investmentData.update((data) => [
      ...data,
      { _id: uuidv4(), ...newElement },
    ]);
    goto("/");
  }

  function updateElement(updatedElement) {
    investmentData.update((data) =>
      data.map((element) =>
        element._id === $selectedInvestment._id
          ? { ...element, ...updatedElement }
          : element
      )
    );
    goto("/");
  }

  function createSubelement(newSubelement) {
    // const { currency } = newSubelement;
    // const c = $currencyData.find((c) => c._id === currency);
    // subelements.update((data) => [
    //   ...data,
    //   { _id: uuidv4(), ...newSubelement, currency: c },
    // ]);

    subelements.update((data) => [
      ...data,
      { _id: uuidv4(), ...newSubelement },
    ]);
    resetFields();
  }

  function updateSubelement(updatedSubelement) {
    // const { currency } = updatedSubelement;
    // const c = $currencyData.find((c) => c._id === currency);
    // subelements.update((data) =>
    //   data.map((subelement) =>
    //     subelement._id === selectedSubelement._id
    //       ? { ...subelement, ...updatedSubelement, currency: c }
    //       : subelement
    //   )
    // );

    subelements.update((data) =>
      data.map((subelement) =>
        subelement._id === selectedSubelement._id
          ? { ...subelement, ...updatedSubelement }
          : subelement
      )
    );
    selectedSubelement = null;
    resetFields();
  }

  function deleteSubelement(subelementId) {
    if ($subelements.some((subelement) => subelement._id === subelementId)) {
      subelements.update((data) =>
        data.filter((subelement) => subelement._id !== subelementId)
      );
    }
    selectedSubelement = null;
    resetFields();
  }
</script>

<ModuleLayout>
  <div class="add-investment-module">
    <div class="add-investment-module-section">
      <div class="form">
        <div class="form-header">
          <h2>
            {$selectedInvestment === null ? "Crear" : "Editar"} Inversión
          </h2>
        </div>
        <div class="form-content">
          <input
            type="text"
            bind:value={description}
            placeholder="Descripción"
          />
          <select bind:value={type}>
            {#each types as t}
              <option value={t}>{t}</option>
            {/each}
          </select>
          {#if type === "Variable"}
            <input
              type="number"
              bind:value={multiplier}
              placeholder="Tiempo del proyecto"
            />
          {/if}
        </div>
      </div>
      <div class="form">
        <div class="form-header">
          <h2>{selectedSubelement ? "Editar" : "Crear"} Rubro</h2>
        </div>
        <div class="form-content">
          <input
            type="text"
            bind:value={descriptionSubelement}
            placeholder="Descripción"
          />
          <input type="number" bind:value={price} placeholder="Precio" />
          <input type="number" bind:value={qty} placeholder="Cantidad" />
          <select bind:value={currency}>
            {#each $currencyData as c}
              <option value={c._id}>{c.name}</option>
            {/each}
          </select>
        </div>
        <div class="form-footer">
          <button
            type="button"
            on:click={() => {
              resetFields();
              selectedSubelement = null;
            }}>Cancelar</button
          >
          <button
            type="button"
            on:click={selectedSubelement
              ? updateSubelement({
                  descriptionSubelement,
                  price,
                  qty,
                  currency,
                })
              : createSubelement({
                  descriptionSubelement,
                  price,
                  qty,
                  currency,
                })}>{selectedSubelement ? "Editar" : "Crear"}</button
          >
        </div>
      </div>
    </div>
    <div class="subelements">
      <div class="save-data">
        <p>
          Total parcial:
          {calculateTotalInvestment(
            { subelements: $subelements },
            $currencyData
          ).toLocaleString()}$
        </p>
        <button
          type="button"
          on:click={() => {
            const elementData = {
              description,
              type,
              multiplier: type === "Variable" ? multiplier : 1,
              subelements: $subelements,
            };

            $selectedInvestment !== null
              ? updateElement(elementData)
              : createElement(elementData);
          }}
          >{$selectedInvestment === null ? "Crear" : "Editar"} Inversión</button
        >
      </div>
      <SubelementList
        subelements={$subelements}
        updateSubelement={(subelement) => {
          selectedSubelement = subelement;
          descriptionSubelement = subelement.descriptionSubelement;
          price = subelement.price;
          qty = subelement.qty;
          // currency = subelement.currency._id;
          currency = subelement.currency;
        }}
        {deleteSubelement}
      />
    </div>
  </div>
</ModuleLayout>

<style>
  .add-investment-module {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 1rem;
  }

  .add-investment-module-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid #a9a9a9;
    border-radius: 8px;
    box-shadow: 0px 0px 5px 0px #a9a9a9;
  }

  .form-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .subelements {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .save-data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
</style>
