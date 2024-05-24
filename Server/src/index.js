import express from "express";
import tenentRouter from "./routes/tenent.route.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/tenents", tenentRouter);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
