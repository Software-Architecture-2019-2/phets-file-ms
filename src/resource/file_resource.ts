import express from "express";
import { upload } from "../config";
import { FileService } from "../service/file_service";
import { FileType } from "../types/types";
import { errorResponse, getFilename } from "../util/utilities";

export class FileResource {
  public static setupResources(app: express.Application) {
    this.app = app;
    this.getFile();
    this.createFile();
    this.deleteFile();
  }
  private static app: express.Application;

  // GET - Route declaration for file retrieve
  private static getFile() {
    this.app.get("/file/:id", (request, response) => {

      if (request.headers.authorization) {
        const token = request.headers.authorization.split(" ")[1];

        const axios = require("axios");

        const getToken = async () => {
          try {
            return await axios.get("http://172.17.0.1:4006/session/validate", {
              data: { token },
              headers: { "Content-Type": "application/json" }
            });
          } catch (error) {
            console.log("Error getToken", error);
          }
        };

        const valid = async () => {
          const res = await getToken();
          if (res.data.valid) {
            console.log(`GET - ${request.url}`);
            const id: string = request.params.id;
            const file = FileService.getFile(id);
            if (file) {
              response.status(200);
              response.sendFile(file);
            } else {
              response.status(404);
              response.send(errorResponse(404, "File does not exist."));
            }
          } else {
            response.status(402);
            response.send(errorResponse(402, "Invalid Token"));
          }
        };
        valid();
      } else {
        response.status(400);
        response.send(errorResponse(400, "Authentication error"));
      }
    });
  }

  // POST - Route declaration for file upload
  private static createFile() {
    this.app.post("/file", upload.single("file"), (request, response, _) => {
      if (request.headers.authorization) {
        const token = request.headers.authorization.split(" ")[1];

        const axios = require("axios");

        const getToken = async () => {
          try {
            return await axios.get("http://172.17.0.1:4006/session/validate", {
              data: { token },
              headers: { "Content-Type": "application/json" }
            });
          } catch (error) {
            console.log("Error getToken", error);
          }
        };

        const valid = async () => {
          const res = await getToken();
          if (res.data.valid) {
            console.log(`POST - ${request.url}`);
            const { filename } = request.file;
            const id = getFilename(filename);
            const file: FileType = { file_id: id };
            response.status(201);
            response.send(file);
          } else {
            response.status(402);
            response.send(errorResponse(402, "Invalid Token"));
          }
        };
        valid();
      } else {
        response.status(400);
        response.send(errorResponse(400, "Authentication error"));
      }
    });
  }

  // DELETE - Route declaration for file remove
  private static deleteFile() {
    this.app.delete("/file/:id", (request, response) => {
      if (request.headers.authorization) {
        const token = request.headers.authorization.split(" ")[1];

        const axios = require("axios");

        const getToken = async () => {
          try {
            return await axios.get("http://172.17.0.1:4006/session/validate", {
              data: { token },
              headers: { "Content-Type": "application/json" }
            });
          } catch (error) {
            console.log("Error getToken", error);
          }
        };

        const valid = async () => {
          const res = await getToken();
          if (res.data.valid) {
            console.log(`DELETE - ${request.url}`);
            const id: string = request.params.id;
            if (FileService.deleteFile(id)) {
              response.status(200);
              response.send({ file_id: id } as FileType);
            } else {
              response.status(404);
              response.send(errorResponse(404, "File does not exist."));
            }
          } else {
            response.status(402);
            response.send(errorResponse(402, "Invalid Token"));
          }
        };
        valid();
      } else {
        response.status(400);
        response.send(errorResponse(400, "Authentication error"));
      }
    });
  }
}
