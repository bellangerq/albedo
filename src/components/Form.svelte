<script>
  import { createEventDispatcher } from 'svelte'

  let loading = false
  let deniedGeolocation = false

  const dispatch = createEventDispatcher()

  const getLocation = () => {
    loading = true
    navigator.geolocation.getCurrentPosition(success, error);
  }

  const success = position => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    submitLocation(latitude, longitude)
  }

  const error = () => {
    loading = false
    deniedGeolocation = true
  }

	const submitLocation = (lat, lon) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_MAP_API_KEY}&units=metric`

    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        loading = false
        dispatch('fetch', {
          temperature: Math.round(data.main.temp),
          feelsLike: Math.round(data.main.feels_like),
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          wind: Math.round(data.wind.speed * 3.6)
        });
      })
	}
</script>

<p>Click to see the weather (use browser's geolocation).</p>

<button type="button" disabled={loading} on:click={getLocation}>
  {#if loading } Loading {:else} Search {/if}
</button>

{#if deniedGeolocation }
  <p>You denied geolocation. It is requried to use To authorize it, check your browser settings.</p>
{/if}