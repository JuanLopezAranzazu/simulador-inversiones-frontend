<script>
  export let label;
  export let value;
</script>

<div class="text">
  <p class="label"><b>{label}</b></p>
  <p>{value}</p>
</div>

<style>
  .text {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  p {
    margin: 0;
  }

  .label {
    font-size: large;
  }
</style>
