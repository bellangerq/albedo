<script>
	import Header from './components/Header.svelte'
	import Form from './components/Form.svelte'
	import Weather from './components/Weather.svelte'

	let weather
	let isCelcius = true

	const setWeather = event => {
		weather = event.detail
	}

	const setUnit = event => {
		isCelcius = event.detail
	}
</script>

<div class="App">
	<Header on:unit={setUnit} />
	<main>
		{#if weather}
			<Weather weather={weather} isCelcius={isCelcius} />
		{:else}
			<Form on:fetch={setWeather} />
		{/if}
	</main>
</div>

<style>
/* https://dribbble.com/shots/10942038-sunny-app-preview */
.App {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	padding: 1rem;
}
</style>