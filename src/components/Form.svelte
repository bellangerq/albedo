<script>
  import { fade } from 'svelte/transition'
  import { createEventDispatcher } from "svelte"

  let loading = false
  let apiError
  let locationError

  const dispatch = createEventDispatcher()

  const getLocation = () => {
    loading = true
    navigator.geolocation.getCurrentPosition(success, error)
  }

  const success = (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    submitLocation(latitude, longitude)
  }

  const error = () => {
    loading = false
    locationError =
      "You denied geolocation. It is required to use Albedo. To authorize it, check your browser settings."
  }

  const submitLocation = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=metric`

    fetch(url)
      .then(response => {
        if (!response.ok) {
          apiError = `Error ${response.status}: ${response.statusText}`
          return
        }
        return response.json()
      })
      .then(data => {
        console.log(data)
        dispatch("fetch", {
          temperature: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          minTemperature: Math.round(data.main.temp_min),
          maxTemperature: Math.round(data.main.temp_max),
          humidity: data.main.humidity,
          wind: Math.round(data.wind.speed * 3.6),
        })
      })
  }
</script>

<section class="Form">
  <button
    transition:fade="{{ duration: 500 }}"
    type="button"
    class="Form__Button"
    class:Form__Button--Loading="{loading}"
    disabled="{loading}"
    on:click="{getLocation}"
  >
    {#if loading }
      Loading
      <svg class="Form__Spinner" stroke="currentColor" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <title>Loading</title>
        <circle class="Form__SpinnerCircle" cx="50" cy="50" r="45"/>
      </svg>
    {:else}
      Get weather
    {/if}
  </button>

  {#if apiError || locationError }
    <p class="Form__Error">
      {#if apiError }
        An error has occured: <code>{ apiError }</code>.
        <a href="mailto:hello@quentin-bellanger.com">Contact me for support</a>.
      {:else}
        { locationError }
      {/if}
    </p>
  {/if}
</section>

<style>
  .Form {
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }

  .Form__Button {
    background: transparent;
    color: var(--color-white);
    border: 3px solid;
    border-radius: 50%;
    cursor: pointer;
    display: block;
    font-size: 1.2rem;
    padding: 0;
    position: relative;
    margin: 0 auto;
    height: 12rem;
    transition-property: background, border, color;
    transition-duration: 0.2s;
    width: 12rem;
  }

  .Form__Button:focus,
  .Form__Button:hover {
    background: var(--color-white);
    border-color: transparent;
    color: var(--color-secondary);
    outline: none;
  }

  .Form__Button--Loading {
    background: var(--color-white);
    border-color: transparent;
    color: var(--color-secondary);
  }

  .Form__Spinner {
    animation: 2s linear infinite svg-animation;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @keyframes svg-animation {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg)
    }
  }

  .Form__SpinnerCircle {
    animation: 1.4s ease-in-out infinite both circle-animation;
    display: block;
    fill: transparent;
    stroke-linecap: round;
    stroke-dasharray: 283;
    stroke-dashoffset: 280;
    stroke-width: 0.25rem;
    transform-origin: 50% 50%;
  }

  @keyframes circle-animation {
    0%,
    25% {
      stroke-dashoffset: 280;
      transform: rotate(0);
    }

    50%,
    75% {
      stroke-dashoffset: 75;
      transform: rotate(45deg);
    }

    100% {
      stroke-dashoffset: 280;
      transform: rotate(360deg);
    }
  }

  .Form__Error {
    font-weight: 400;
    margin-top: 2rem;
    text-align: center;
  }
</style>
