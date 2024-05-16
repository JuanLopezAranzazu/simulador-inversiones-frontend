<script>
  export let label;
  export let value;
  export let state = true;

  $: style = !state ? "flex: none;" : "flex: 1;";
</script>

<div class="text" {style}>
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
