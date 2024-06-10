import express from "express";
import fs from "fs";

const videosRouter = express.Router();

const readVideos = () => {
  const videoData = fs.readFileSync("./data/videos.json");
  return JSON.parse(videoData);
};

videosRouter.route("/").get((_req, res) => {
  const videosData = readVideos();
  res.json(videosData);
});

export default videosRouter;
