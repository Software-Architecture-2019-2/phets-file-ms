import UPLOADER, { SERVER } from "../config";


SERVER.post("/upload", UPLOADER.single("myFile"), (req, res, next) => {
    const file = req.file;
    const id = uuid.apply(file.filename);
    res.send({id});
    uuid.toString();
  });

SERVER.get("/", (request, response) => {
    response.send("Hello World!");
});