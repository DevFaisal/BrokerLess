import { app } from "../src/app.js";
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Express on Vercel"));

// favicon.icon error
app.get("/favicon.ico", (req, res) => res.status(204));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
