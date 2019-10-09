import express from "express";
import { upload } from "../config";
import Service from "../service";
import { getFilename } from "../util";

export default (app: express.Application) => {
  // Route declaration for file retrieve
  app.get("/:id", (request, response) => {
    const id: string = request.params.id;
    const file = Service.getFile(id);
    if (file) {
      response.sendFile(file);
    } else {
      response.sendStatus(404);
    }
  });

  // Route declaration for file upload
  app.post("/", upload.single("myFile"), (req, res, next) => {
    const { filename } = req.file;
    const id = getFilename(filename);
    res.send({ id });
  });

  // Route declaration for file remove
  app.delete("/:id", (request, response) => {
    const id: string = request.params.id;
    if (Service.deleteFile(id)) {
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  });
};
