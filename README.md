# React Stats

This is a simple, single page ReactJS app to show statistics from the web server it's hosted on.

The client-side JS is compiled from TypeScript, and served from a bundle through ExpressJS. The ExpressJS server also contains the API request routes.

## Deployment

### Development

1. Clone the repo.
2. Run `npm install` to get the required node modules.
3. Create a JSON file in the project root called `config.json` and see the [Config](#config) section.
4. Run `npm start` to start the dev server. We use `nodemon` and `webpack-dev-middleware` for hot reloading.

### Production

1. Clone the repo.
2. Run `npm install` to get the required node modules.
3. Create a JSON file in the project root called `config.json` and see the [Config](#config) section.
4. Run `npm run build` to create the bundle.
5. Using your preferred hosting software (PM2 is easy to start with), use the `npm start` command to start the server.

### Config
`PORT` - `number` specifying the desired port. Default is `3000`.
