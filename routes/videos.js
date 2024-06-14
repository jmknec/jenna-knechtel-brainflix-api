import { channel } from "diagnostics_channel";
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
    const minVideosData = videosData.map(({ id, title, channel, image }) => ({
      id,
      title,
      channel,
      image,
    }));
    res.json(minVideosData);
  })
  .post((req, res) => {
    const { title, description } = req.body;

    const videoData = readVideos();
    const newVideo = {
      id: v4(),
      title,
      channel: "Jenna Knechtel",
      image: "",
      description,
      views: 0,
      likes: 0,
      duration: "",
      video: "",
      timestamp: new Date(),
      comments: [],
    };
    videoData.push(newVideo);

    fs.writeFileSync("./data/videos.json", JSON.stringify(videoData));

    res.send("Thank you for uploading a video");
  });

videosRouter.get("/:id", (req, res) => {
  const idParam = req.params.id;
  const videos = readVideos();
  const videoDetails = videos.find((video) => video.id === idParam);

  if (!videoDetails) {
    return res.status(404).send("Sorry, that video does not exist");
  }

  res.json(videoDetails);
});

export default videosRouter;
