<script>
  import { goto } from "$app/navigation";
  import { v4 as uuidv4 } from "uuid";
  import { writable } from "svelte/store";
  import { SvelteEasyToast, toast } from "svelte-easy-toast";
  //components
  import ModuleLayout from "../../lib/components/ModuleLayout.svelte";
  import SubelementList from "../../lib/components/ManageInvestment/SubelementList.svelte";
  //store
  import {
    currencyData,
    investmentData,
    selectedInvestment,
  } from "./../../lib/store/store";

  const types = ["Fija", "Variable"];

  try {
    if (
      $selectedInvestment !== null &&
      !$investmentData.some(
        (investment) => investment._id === $selectedInvestment._id
      )
    ) {
      selectedInvestment.update((data) => (data = null));
    }
  } catch (error) {
    console.error(error);
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
    try {
      investmentData.update((data) => [
        ...data,
        { _id: uuidv4(), ...newElement },
      ]);
      goto("/investment");
      toast({
        type: "success",
        position: "bottom-right",
        text: "Se ha creado la cuenta principal correctamente!",
        title: "Cuenta principal creada",
        delay: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function updateElement(updatedElement) {
    try {
      investmentData.update((data) =>
        data.map((element) =>
          element._id === $selectedInvestment._id
            ? { ...element, ...updatedElement }
            : element
        )
      );
      goto("/investment");
      toast({
        type: "success",
        position: "bottom-right",
        text: "Se ha actualizado la cuenta principal correctamente!",
        title: "Cuenta principal actualizada",
        delay: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function createSubelement(newSubelement) {
    try {
      subelements.update((data) => [
        ...data,
        { _id: uuidv4(), ...newSubelement },
      ]);
      resetFields();
      toast({
        type: "success",
        position: "bottom-right",
        text: "Se ha creado la subcuenta correctamente!",
        title: "Subcuenta creada",
        delay: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function updateSubelement(updatedSubelement) {
    try {
      subelements.update((data) =>
        data.map((subelement) =>
          subelement._id === selectedSubelement._id
            ? { ...subelement, ...updatedSubelement }
            : subelement
        )
      );
      selectedSubelement = null;
      resetFields();
      toast({
        type: "success",
        position: "bottom-right",
        text: "Se ha actualizado la subcuenta correctamente!",
        title: "Subcuenta actualizada",
        delay: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  }

  function deleteSubelement(subelementId) {
    try {
      if ($subelements.some((subelement) => subelement._id === subelementId)) {
        subelements.update((data) =>
          data.filter((subelement) => subelement._id !== subelementId)
        );
        toast({
          type: "success",
          position: "bottom-right",
          text: "Se ha eliminado la subcuenta correctamente!",
          title: "Subcuenta eliminada",
          delay: 3000,
        });
      }
      selectedSubelement = null;
      resetFields();
    } catch (error) {
      console.error(error);
    }
  }
</script>

<ModuleLayout>
  <div class="add-investment-module">
    <div class="add-investment-module-section">
      <div class="form">
        <div class="form-header">
          <h2>
            {$selectedInvestment === null ? "Crear" : "Editar"} Cuenta Principal
          </h2>
        </div>
        <div class="form-content">
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
            <label for="type">Tipo</label>
            <select bind:value={type}>
              {#each types as t}
                <option value={t}>{t}</option>
              {/each}
            </select>
          </div>
          {#if type === "Variable"}
            <div class="form-element">
              <label for="multiplier">Tiempo del proyecto</label>
              <input
                id="multiplier"
                type="number"
                bind:value={multiplier}
                placeholder="Tiempo del proyecto"
              />
            </div>
          {/if}
        </div>
      </div>
      <div class="form">
        <div class="form-header">
          <h2>{selectedSubelement ? "Editar" : "Crear"} Subcuenta</h2>
        </div>
        <div class="form-content">
          <div class="form-element">
            <label for="descriptionSubelement">Descripción</label>
            <input
              id="descriptionSubelement"
              type="text"
              bind:value={descriptionSubelement}
              placeholder="Descripción"
            />
          </div>
          <div class="form-element">
            <label for="price">Precio</label>
            <input
              id="price"
              type="number"
              bind:value={price}
              placeholder="Precio"
            />
          </div>
          <div class="form-element">
            <label for="qty">Cantidad</label>
            <input
              id="qty"
              type="number"
              bind:value={qty}
              placeholder="Cantidad"
            />
          </div>
          <div class="form-element">
            <label for="currency">Moneda</label>
            <select id="currency" bind:value={currency}>
              {#each $currencyData as c}
                <option value={c._id}>{c.name}</option>
              {/each}
            </select>
          </div>
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
          >{$selectedInvestment === null ? "Crear" : "Editar"} Cuenta Principal</button
        >
      </div>
      <SubelementList
        subelements={$subelements}
        updateSubelement={(subelement) => {
          selectedSubelement = subelement;
          descriptionSubelement = subelement.descriptionSubelement;
          price = subelement.price;
          qty = subelement.qty;
          currency = subelement.currency;
        }}
        {deleteSubelement}
      />
    </div>
  </div>
</ModuleLayout>

<SvelteEasyToast />

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
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
  }
</style>
