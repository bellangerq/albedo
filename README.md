# Albedo

Weather app built with [Svelte.js](https://svelte.dev/).

## Development

Install the dependencies:

```bash
npm install
```

Add OpenWeatherMap API key in `.env` file:

```
OPEN_WEATHER_MAP_API_KEY=value
```

Run local server on [port 5000](http://localhost:5000):

```bash
npm run dev
```

## Deployment

Every push on `master` branch will trigger a deployment on `https://albedo.netlify.com`.
