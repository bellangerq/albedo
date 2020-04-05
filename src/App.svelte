<script>
	import Header from './components/Header.svelte'
	import Form from './components/Form.svelte'
	import Weather from './components/Weather.svelte'

	let weather
	console.log(process.env)

	const setWeather = event => {
		weather = event.detail
	}
</script>

<Header />
<main>
	<Form on:fetch={setWeather} />
	{#if weather}
		<Weather weather={weather} />
	{/if}
</main>