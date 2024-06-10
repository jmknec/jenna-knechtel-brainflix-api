import express from "express";
import fs from "fs";
import { v4 } from "uuid";

const videosRouter = express.Router();

const readVideos = () => {
  const videoData = fs.readFileSync("./data/videos.json");
  return JSON.parse(videoData);
};

videosRouter
  .route("/")
  .get((_req, res) => {
    const videosData = readVideos();
    res.json(videosData);
  })
  .post((req, res) => {
    const { title, description } = req.body;

    const videoData = readVideos();
    const newVideo = {
      id: v4(),
      title,
      description,
    };
    videoData.push(newVideo);

    fs.writeFileSync("./data/videos.json", JSON.stringify(videoData));

    res.send("Thank you for uploading a video");
  });

export default videosRouter;
