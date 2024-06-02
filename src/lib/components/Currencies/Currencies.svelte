<script>
  import { onDestroy } from "svelte";
  import { SvelteEasyToast, toast } from "svelte-easy-toast";
  //store
  import { currencyData } from "./../../store/store";

  function findCurrency(currencyName) {
    try {
      return $currencyData.find((currency) => currency.name === currencyName)
        .value;
    } catch (error) {
      console.error(error);
    }
  }

  let value1;
  let value2;

  const unsubscribe = currencyData.subscribe((data) => {
    value1 = findCurrency("USD");
    value2 = findCurrency("EUR");
  });

  onDestroy(unsubscribe);

  function updateCurrency() {
    try {
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
      toast({
        type: "success",
        position: "bottom-right",
        text: "Se han actualizado los datos correctamente!",
        title: "Datos actualizados!",
        delay: 3000,
      });
    } catch (error) {
      console.error(error);
    }
  }
</script>

<div class="currencies">
  <h2>Monedas</h2>
  <div class="form-element">
    <label for="usd">USD</label>
    <input
      id="usd"
      type="number"
      bind:value={value1}
      placeholder="Valor USD"
      min="0"
    />
  </div>
  <div class="form-element">
    <label for="eur">EUR</label>
    <input
      id="eur"
      type="number"
      bind:value={value2}
      placeholder="Valor EUR"
      min="0"
    />
  </div>
  <div class="save-data">
    <button type="button" on:click={() => updateCurrency()}>Guardar</button>
  </div>
</div>

<SvelteEasyToast />

<style>
  .currencies {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 1rem;
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
