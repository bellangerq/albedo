import App from './App.svelte';

console.log(process.env)

const app = new App({
	target: document.body
});

export default app;