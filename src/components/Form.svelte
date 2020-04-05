<script>
  import { createEventDispatcher } from "svelte";

  let loading = false;
  let apiError;
  let locationError;

  const dispatch = createEventDispatcher();

  const getLocation = () => {
    loading = true;
    navigator.geolocation.getCurrentPosition(success, error);
  };

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    submitLocation(latitude, longitude);
  };

  const error = () => {
    loading = false;
    locationError =
      "You denied geolocation. It is required to use Albedo. To authorize it, check your browser settings.";
  };

  const submitLocation = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=metric`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          apiError = `Error ${response.status}: ${response.statusText}`;
          return;
        }
        return response.json();
      })
      .then((data) => {
        loading = false;
        dispatch("fetch", {
          temperature: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          wind: Math.round(data.wind.speed * 3.6),
        });
      });
  };
</script>

<section class="Form">
  <h2 class="Form__Title">
    Click to see the weather (uses browser's geolocation).
  </h2>

  <button
    type="button"
    class="Form__Button"
    disabled="{loading}"
    on:click="{getLocation}"
  >
    {#if loading } Loading {:else} Search {/if}
  </button>

  {#if apiError || locationError }
  <p class="Form__Error">
    {#if apiError } An error has occured: <code>{ apiError }</code>.
    <a href="mailto:hello@quentin-bellanger.com">Contact me for support</a>.
    {:else} { locationError } {/if}
  </p>
  {/if}
</section>

<style>
  .Form__Title {
    text-align: center;
  }

  .Form__Button {
    border: 1px solid;
    padding: 1rem;
    width: 100%;
  }

  .Form__Error {
    text-align: center;
  }
</style>
