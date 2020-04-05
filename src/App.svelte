<script>
	import Header from './components/Header.svelte'
	import Form from './components/Form.svelte'
	import Weather from './components/Weather.svelte'

	let weather

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

<style>
	:global(.visually-hidden) {
		position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    white-space: nowrap;
	}
</style>