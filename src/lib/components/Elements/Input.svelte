<script>
  export let id;
  export let label;
  export let value;
  export let type = "text";
  export let errorMessage = "";
</script>

<div class="input-field">
  <label for={id}>{label}</label>
  <input bind:value class:error={errorMessage} />
  {#if errorMessage}
    <p class="error-message">{errorMessage}</p>
  {/if}
</div>

<style>
  .input-field {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .error-message {
    color: red;
  }

  .error {
    border-color: red;
  }
</style>
