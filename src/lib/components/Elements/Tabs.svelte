<script>
  export let tabs = [];
  let activeTab = 0;

  function setActiveTab(index) {
    activeTab = index;
  }
</script>

<div>
  <div>
    {#each tabs as tab, index}
      <div
        class="tab {index === activeTab ? 'active' : ''}"
        on:click={() => setActiveTab(index)}
      >
        {tab.title}
      </div>
    {/each}
  </div>

  <div class="content">
    {#each tabs as tab, index}
      {#if index === activeTab}
        <svelte:component this={tab.component} />
      {/if}
    {/each}
  </div>
</div>

<style>
  .tab {
    display: inline-block;
    padding: 10px;
    cursor: pointer;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-bottom: none;
  }

  .tab.active {
    background-color: #fff;
    border-bottom: 1px solid #ccc;
  }

  .content {
    padding: 20px;
    border: 1px solid #ccc;
  }
</style>
