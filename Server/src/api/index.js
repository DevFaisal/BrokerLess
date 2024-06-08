import { app } from "../app.js";
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Express on Vercel"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
