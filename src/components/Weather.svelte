<script>
  export let weather
</script>

<dl>
  {#if weather.temperature}
    <dt>Temperature</dt>
    <dd>{ weather.temperature }°C {#if weather.feelsLike}  (feels like { weather.feelsLike }°C) {/if}</dd>
  {/if}
  {#if weather.wind}
    <dt>Wind speed</dt>
    <dd>{ weather.wind }km/h</dd>
  {/if}
  {#if weather.humidity}
    <dt>Humidity</dt>
    <dd>{ weather.humidity }%</dd>
  {/if}
  {#if weather.pressure}
    <dt>Pressure</dt>
    <dd>{ weather.pressure }mBar</dd>
  {/if}
</dl>