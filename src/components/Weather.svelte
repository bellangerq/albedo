<script>
  import { fade, fly } from 'svelte/transition'
  export let weather
  export let isCelcius

  let temperatureUnit

  const toFahrenheit = value => {
    return (value * 9/5) + 32
  }
</script>

<div transition:fade="{{ duration: 500, delay: 500 }}" class="Weather" aria-live="polite">
  <div class="Weather__Primary">
    {#if weather.temperature}
      <span class="Weather__Temperature">
        <span class="visually-hidden">Temperature</span>
        {#if isCelcius}
          { weather.temperature } °C
        {:else}
          { toFahrenheit(weather.temperature)} °F
        {/if}
      </span>
    {/if}

    {#if weather.feelsLike}
      <span class="Weather__FeelsLike">
        (feels like
        {#if isCelcius}
          { weather.feelsLike } °C
        {:else}
          { toFahrenheit(weather.feelsLike)} °F
        {/if}
        )
      </span>
    {/if}
  </div>

  <p class="Weather__Advice">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

  <ul class="Weather__Secondary">
  {#if weather.maxTemperature}
    <li class="Weather__SecondaryInfo" transition:fly="{{ x: -25, duration: 600 }}">
      <svg class="Weather__Icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <title>Minimum temperature</title>
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
      <span>
        {#if isCelcius}
          { weather.maxTemperature } °C
        {:else}
          { toFahrenheit(weather.maxTemperature) } °F
        {/if}
      </span>
    </li>
  {/if}

  {#if weather.minTemperature}
    <li class="Weather__SecondaryInfo" transition:fly="{{ x: -25, duration: 600, delay: 800 }}">
      <svg class="Weather__Icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <title>Maximum temperature</title>
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
      <span>
        {#if isCelcius}
          { weather.minTemperature } °C
        {:else}
          { toFahrenheit(weather.minTemperature) } °F
        {/if}
      </span>
    </li>
  {/if}

  {#if weather.wind}
    <li class="Weather__SecondaryInfo" transition:fly="{{ x: -25, duration: 600, delay: 1100 }}">
      <svg class="Weather__Icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <title>Wind speed</title>
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path>
      </svg>
      <span>{ weather.wind } km/h</span>
    </li>
  {/if}

  {#if weather.humidity}
    <li class="Weather__SecondaryInfo" transition:fly="{{ x: -25, duration: 600, delay: 1400 }}">
      <svg class="Weather__Icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <title>Humidity</title>
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
      </svg>
      <span class="visually-hidden">
        Humidity
      </span>
      <span>{ weather.humidity }%</span>
    </li>
  {/if}
  </ul>
</div>

<style>
  .Weather__Primary {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
  }

  .Weather__FeelsLike {
    flex-basis: 100%;
    font-weight: 400;
    justify-self: flex-end;
  }

  .Weather__Temperature {
    font-size: 3rem;
    line-height: 1;
  }

  .Weather__Advice {
    font-weight: 400;
    margin: 1rem 0 4rem;
  }

  .Weather__SecondaryInfo {
    align-items: center;
    display: flex;
  }

  .Weather__SecondaryInfo:not(:last-child) {
    margin-bottom: 1rem;
  }

  .Weather__Icon {
    margin-right: 1rem;
  }
</style>