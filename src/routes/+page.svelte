<script>
  import "./../style/global.css";
  import { goto } from "$app/navigation";
  const style = "background-color: var(--color2); color: white;";
</script>

<div class="container">
  <div class="section content-left">
    <h1>Investment Simulator</h1>
    <p>Maximiza tu potencial financiero con nuestra plataforma</p>
    <p>¡Invierte con inteligencia, invierte con nosotros!</p>
  </div>
  <div class="section">
    <h1>¡Bienvenido!</h1>
    <p>Inicia tu proyecto ahora</p>
    <button type="button" {style} on:click={() => goto("/investment")}
      >Iniciar proyecto</button
    >
  </div>
</div>

<style>
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
  }

  .content-left h1 {
    color: var(--color2);
  }

  .section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .content-left {
    background: linear-gradient(
      180deg,
      rgba(20, 33, 61, 1) 0%,
      rgba(37, 62, 115, 1) 52%,
      rgba(55, 93, 175, 1) 100%
    );
    color: white;
  }
</style>
