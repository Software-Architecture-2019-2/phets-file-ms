import express from "express";
import * as config from "./config";
import {FileResource} from "./resource/file_resource";

// Create a new express application instance
const app = express();

FileResource.setupResources(app);
app.listen(config.PORT, () => {
    console.log(`Listening on port ${config.PORT}!`);
});

export default app;
