import express from "express";
import dotenv from "dotenv";
import router from "./Router/index";
import fileUpload from "express-fileupload";
import swaggerGenerator from "express-swagger-generator";
import swaggerOptions from "./swagger";

dotenv.config();

const app = express();
app.use(express.json());
app.use(fileUpload());

app.use((_, res, next) => {
  res.set({ Tk: "!" });
  next();
});

swaggerGenerator(app)(swaggerOptions);

router(process.env.API_ROOT, app);

// listen for requests
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

export default app;
