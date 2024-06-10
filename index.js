import "dotenv/config";
import express from "express";
import videosRouter from "./routes/videos.js";

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());

app.use("/videos", videosRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
