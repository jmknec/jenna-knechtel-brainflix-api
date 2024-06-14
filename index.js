import express from "express";
import cors from "cors";
import "dotenv/config";
import videosRouter from "./routes/videos.js";

const app = express();
const port = process.env.PORT || 8081;
const { CORS_URL } = process.env;

app.use(express.json());
app.use(cors({ origin: CORS_URL }));
app.use(express.static("public"));

app.use("/videos", videosRouter);
app.use("/videos/:id", videosRouter);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
