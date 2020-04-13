import App from './App.svelte';

console.log(process.env)
import './assets/styles/reset.css'
import './assets/styles/variables.css'
import './assets/styles/helpers.css'
import './assets/styles/layout.css'

const app = new App({
	target: document.body
});

export default app;