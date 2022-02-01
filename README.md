# React Stats

This is a simple, single page ReactJS app to show statistics from the web server it's hosted on.

## Deployment

### Development

1. Clone the repo.
2. Run `npm install` to get the required node modules.
3. Run `npm run ts` to run the TypeScript compiler. This will create a `src` folder containing the compiled JS.
4. Run `npm start` to start the dev server, and `npm run start:server` to start the backend service.
5. Go to [localhost:8080](#http://localhost:8080/) to see the site!

When making changes, make them in the `.tsx` files, and run `npm run ts` to update JS. This will trigger the dev server to reload.

### Environment

At the moment, the domain is defined by an the environment variable `IP_ADDR`. It defaults to `localhost`, but can be overridden for production.

### Production

Same as above, but instead of steps 4 and 5, use `npm run build` to compile the JS into a bundle.