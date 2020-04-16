<script>
  import { fade, fly } from 'svelte/transition'
  export let weather
  export let isCelcius

  let temperatureUnit

  const toFahrenheit = value => {
    return (value * 9/5) + 32
  }

  const weatherIcon = () => {
    // Thunder
    if (weather.weatherNumber.startsWith('2')) {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <title>${weather.weatherDesc}</title>
          <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"></path>
          <polyline points="13 11 9 17 15 17 11 23"></polyline>
        </svg>
      `
    }

    // Drizzle
    if (weather.weatherNumber.startsWith('3')) {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <title>${weather.weatherDesc}</title>
          <line x1="8" y1="19" x2="8" y2="21"></line>
          <line x1="8" y1="13" x2="8" y2="15"></line>
          <line x1="16" y1="19" x2="16" y2="21"></line>
          <line x1="16" y1="13" x2="16" y2="15"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="12" y1="15" x2="12" y2="17"></line>
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
        </svg>
      `
    }

    // Rain
    if (weather.weatherNumber.startsWith('5')) {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <title>${weather.weatherDesc}</title>
          <line x1="16" y1="13" x2="16" y2="21"></line>
          <line x1="8" y1="13" x2="8" y2="21"></line>
          <line x1="12" y1="15" x2="12" y2="23"></line>
          <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
        </svg>
      `
    }

    // Snow
    if (weather.weatherNumber.startsWith('6')) {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <title>${weather.weatherDesc}</title>
          <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"></path>
          <line x1="8" y1="16" x2="8.01" y2="16"></line>
          <line x1="8" y1="20" x2="8.01" y2="20"></line>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
          <line x1="12" y1="22" x2="12.01" y2="22"></line>
          <line x1="16" y1="16" x2="16.01" y2="16"></line>
          <line x1="16" y1="20" x2="16.01" y2="20"></line>
        </svg>
      `
    }

    // Cloud
    if (weather.weatherNumber.startsWith('80')) {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <title>${weather.weatherDesc}</title>
          <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
        </svg>
      `
    }

    // Clear
    if (weather.weatherNumber === '800') {
      return `
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <title>${weather.weatherDesc}</title>
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `
    }
  }
</script>

<div transition:fade="{{ duration: 500, delay: 500 }}" class="Weather" aria-live="polite">
  <div class="Weather__Primary">
    { @html weatherIcon() }

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

  <hr class="Weather__Separator" />

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
    margin-left: 1rem;
  }

  .Weather__Separator {
    border-radius: 3px;
    border: none;
    border-top: 2px solid var(--color-white);
    margin: 2rem 0 4rem;
    width: 15%;
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