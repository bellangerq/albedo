<script>
  import { createEventDispatcher } from "svelte"

  let isCelcius = true
  const dispatch = createEventDispatcher()

  const toggleUnit = () => {
    isCelcius = !isCelcius
    dispatch('unit', isCelcius)
  }
</script>

<header class="Header">
  <h1 class="Header__Title">
    <svg class="Header__Icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="22" y1="12" x2="18" y2="12"></line>
      <line x1="6" y1="12" x2="2" y2="12"></line>
      <line x1="12" y1="6" x2="12" y2="2"></line>
      <line x1="12" y1="22" x2="12" y2="18"></line>
    </svg>
    <span>Albedo</span>
  </h1>
  <button class="Header__Button" type="button" on:click="{toggleUnit}">
    <span class="visually-hidden">Current unit</span>
    {#if isCelcius} °C {:else} °F {/if}
    <span class="visually-hidden">Switch to {#if isCelcius} °F {:else} °C {/if}</span>
  </button>
</header>

<style>
  .Header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 4rem;
  }

  .Header__Title {
    align-items: center;
    display: flex;
    font-size: 1rem;
    font-weight: 600;
  }

  .Header__Icon {
    margin-right: 0.5rem;
    width: 0.8em;
  }

  .Header__Button {
    background: transparent;
    border: 2px solid var(--color-white);
    border-radius: 3px;
    color: var(--color-white);
    transition-property: background, color;
    transition-duration: 0.2s;
  }

  .Header__Button:hover {
    background: var(--color-white);
    color: var(--color-secondary);
  }

  .Header__Button:focus {
    box-shadow: 0 0 0 3px var(--color-outline);
    outline: none;
  }
</style>