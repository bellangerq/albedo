<script>
  export let weather
</script>

<section class="Weather">
  <div class="Weather__Data Weather__Data--Temperature">
    <h2 class="visually-hidden">Temperature</h2>
    <span>{ weather.temperature }<small class="Weather__Unit">°C</small> {#if weather.feelsLike}<span>(feels like { weather.feelsLike }<small class="Weather__Unit">°C</small>)</span>{/if}</span>
  </div>

  {#if weather.wind}
  <div class="Weather__Data Weather__Data--Wind">
    <h2 class="visually-hidden">Wind speed</h2>
    <span>{ weather.wind } <small class="Weather__Unit">km/h</small></span>
  </div>
  {/if}

  {#if weather.humidity}
  <div class="Weather__Data Weather__Data--Humidity">
    <h2 class="visually-hidden">Humidity</h2>
    <span>{ weather.humidity }<small class="Weather__Unit">%</small></span>
  </div>
  {/if}

  {#if weather.pressure}
  <div class="Weather__Data Weather__Data--Pressure">
    <h2 class="visually-hidden">Pressure</h2>
    <span>{ weather.pressure } <small class="Weather__Unit">mBar</small></span>
  </div>
  {/if}
</section>

<style>
  .Weather {
    display: grid;
    grid-template-areas:
      "temperature temperature temperature"
      "wind humidity pressure"
    ;
  }

  .Weather__Data {
    align-content: center;
    justify-items: center;
    padding: 1rem;
    text-align: center;
  }

  .Weather__Data--Temperature {
    grid-area: temperature;
  }

  .Weather__Data--Wind {
    grid-area: wind;
  }

  .Weather__Data--Humidity {
    grid-area: humidity;
  }

  .Weather__Data--Pressure {
    grid-area: pressure;
  }
</style>