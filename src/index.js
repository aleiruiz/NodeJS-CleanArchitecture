import express from "express";
//  import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./Router/index";

dotenv.config();

const app = express();
app.use(express.json());

app.use((_, res, next) => {
  res.set({ Tk: "!" });
  next();
});

router(process.env.API_ROOT, app);

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

export default app;
