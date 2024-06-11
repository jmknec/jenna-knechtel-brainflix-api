import express from "express";
import cors from "cors";
import fs from "fs";
import "dotenv/config";
import videosRouter from "./routes/videos.js";

const app = express();
const port = process.env.PORT || 8081;
const { CORS_URL } = process.env;

app.use(express.json());
app.use(cors({ origin: CORS_URL }));

app.use("/videos", videosRouter);

app.get("/videos/:id", (req, res) => {
  const idParam = req.params.id;
  const videos = JSON.parse(fs.readFileSync("./data/videos.json"));
  const videoDetails = videos.find((video) => video.id === idParam);

  if (!videoDetails) {
    return res.status(404).send("Sorry, that video does not exist");
  }

  res.json(videoDetails);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
