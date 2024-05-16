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

  .currency {
    display: flex;
    flex-direction: column;
  }
</style>
