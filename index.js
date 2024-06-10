import "dotenv/config";
import express from "express";

const app = express();
const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
