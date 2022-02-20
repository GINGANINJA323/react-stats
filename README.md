# React Stats

This is a simple, single page ReactJS app to show statistics from the web server it's hosted on.

## Deployment

### Development

1. Clone the repo.
2. Run `npm install` to get the required node modules.
3. Create a JSON file in the project root called `config.json` and see the [Config](#config) section.
4. Run `npm run build` to run the TypeScript compiler. This will create a `src` folder containing the compiled JS.
5. Run `npm start` to start the dev server.
6. Go to [localhost:3000](#http://localhost:3000/) to see the site!

When making changes, make them in the `.tsx` files, and run `npm run build` to update JS.

### Config
The config file needs 2 keys:

1. `DOMAIN` - `string` specifying the desired domain. Default is `localhost`.
2. `PORT` - `number` specifying the desired port. Default is `3000`.
