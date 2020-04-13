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

## Svelte feedbacks

- Lack of documentation about using Sass and importing `assets` (global styles, images...).
- The syntax is nice (maybe it's only due to switching from another one that makes it cool).
- Simple transitions are easy to setup with just an attribute.
- Errors are not logged to the browser's console. Sometimes you just wonder why it doesn't work until you find the error in the server console.