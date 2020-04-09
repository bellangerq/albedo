const fs = require('fs')
fs.writeFileSync('./public/build/.env', `OPEN_WEATHER_MAP_API_KEY=${process.env.OPEN_WEATHER_MAP_API_KEY}\n`)