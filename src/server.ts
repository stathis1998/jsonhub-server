import express, { Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Routes

/** Test
 * @route GET /test
 * @returns {string}
 */
app.get("/test", (_req: Request, res: Response) => {
  res.send("Hello World");
});

/** Get JSON by UUID
 * @route GET /json/:uuid
 * @returns {object}
 */
app.get("/json/:uuid", (req: Request, res: Response) => {
  // Checking if file exists
  if (fs.existsSync(`./db/files/${req.params.uuid}.json`)) {
    // Reading file
    const file = fs.readFileSync(`./db/files/${req.params.uuid}.json`, "utf8");
    // Parsing file
    const json = JSON.parse(file);
    // Sending JSON
    res.send(json);
  } else {
    // File not found
    res.status(404).send({ error: "File not found" });
  }
});
