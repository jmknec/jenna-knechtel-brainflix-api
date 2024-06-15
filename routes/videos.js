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
    const minVideosData = videosData.map(
      ({ id, title, channel, image, alt }) => ({
        id,
        title,
        channel,
        image,
        alt,
      })
    );
    res.json(minVideosData);
  })
  .post((req, res) => {
    const { title, description } = req.body;
    const times = (min, max) => {
      const minCeiled = Math.ceil(min);
      const maxFloor = Math.floor(max);
      return Math.floor(Math.random() * (maxFloor - minCeiled));
    };
    const minutes = times(1, 60).toString().padStart(2, "0");
    const seconds = times(1, 60).toString().padStart(2, "0");
    const duration = `${minutes}:${seconds}`;

    const videoData = readVideos();
    const newVideo = {
      id: v4(),
      title,
      channel: "Jenna Knechtel",
      image: "http://localhost:8080/images/image9.jpg",
      description,
      views: 0,
      likes: 0,
      duration,
      video: "https://unit-3-project-api-0a5620414506.herokuapp.com/stream",
      timestamp: Date.now(),
      alt: "Two smiling drag queens",
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
