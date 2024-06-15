<script>
  export let onSearch = () => {};
  let search = "";

  const handleInput = () => {
    onSearch(search);
  };
</script>

<input
  type="text"
  bind:value={search}
  on:input={handleInput}
  placeholder="Buscar..."
/>
