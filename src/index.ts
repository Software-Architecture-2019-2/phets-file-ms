import uuid from "uuid";
import UPLOADER, { PORT, SERVER } from "./config";

SERVER.post("/upload", UPLOADER.single("myFile"), (req, res, next) => {
    const file = req.file;
    const id = uuid.apply(file.filename);
    res.send({id});
    uuid.toString();
  });

SERVER.get("/", (request, response) => {
    response.send("Hello World!");
});

SERVER.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
