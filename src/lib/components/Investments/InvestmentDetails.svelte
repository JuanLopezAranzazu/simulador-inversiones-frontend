<script>
  //store
  import { investmentData } from "../../store/store";

  function calculateTotalByType(investments, type) {
    return investments
      .filter((investment) => investment.type === type)
      .reduce(
        (total, investment) =>
          total + investment.price * investment.qty * investment.currency.value,
        0
      );
  }

  $: total1 = calculateTotalByType($investmentData, "Fija");
  $: total2 = calculateTotalByType($investmentData, "Variable");
</script>

<div class="investment-details">
  <h1>Detalles de inversión</h1>

  <p>Inversiones fijas: ${total1.toLocaleString()}</p>
  <p>Inversiones variables: ${total2.toLocaleString()}</p>
</div>

<style>
  .investment-details {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--color3);
    border-radius: 8px;
    padding: 10px;
  }
</style>
