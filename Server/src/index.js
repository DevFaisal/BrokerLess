import { app } from "./api/app.js";
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
