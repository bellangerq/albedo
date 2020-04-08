<script>
  import { fly } from 'svelte/transition'
  export let weather
</script>

<section class="Weather">
  {#if weather.temperature}
    <div transition:fly="{{ x: -25, duration: 600 }}">
      <h2>
        <img src="temperature.svg" alt>
        <span class="visually-hidden">
          Temperature
        </span>
      </h2>
      <span>{ weather.temperature }°C {#if weather.feelsLike}(feels like { weather.feelsLike }°C){/if}</span>
    </div>
  {/if}

  {#if weather.wind}
    <div transition:fly="{{ x: -25, duration: 600, delay: 300 }}">
      <h2>
        <img src="wind.svg" alt>
        <span class="visually-hidden">
          Wind speed
        </span>
      </h2>
      <span>{ weather.wind } km/h</span>
    </div>
  {/if}

  {#if weather.humidity}
    <div transition:fly="{{ x: -25, duration: 600, delay: 600 }}">
      <h2>
        <img src="humidity.svg" alt>
        <span class="visually-hidden">
          Humidity
        </span>
      </h2>
      <span>{ weather.humidity }%</span>
    </div>
  {/if}
</section>