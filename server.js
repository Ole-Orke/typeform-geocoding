import express from "express";
import path from "path";
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("./public/index.html");
});

app.listen(process.env.PORT || 8080);
