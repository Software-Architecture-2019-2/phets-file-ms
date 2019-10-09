import express from "express";
import * as config from "./config";
import loadResources from "./resource";

// Create a new express application instance
const app = express();

loadResources(app);
app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}!`);
});

export default app;
