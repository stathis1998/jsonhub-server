import express, { Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";

import { isTokenValid, getUser } from "./util";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

/** Get files
 * @route GET /files
 * @returns {object}
 */
app.get("/files", (req: Request, res: Response) => {
  // Check if token exists
  const token = req.query.token as string;
  if (!token) {
    return res.status(401).send({ error: "Token is required" });
  }

  if (isTokenValid(token)) {
    return res.status(200).send({ files: getUser(token).files });
  }

  return res.status(401).send({ error: "Token is invalid" });
});

/** Get JSON
 * @route GET /json/:uuid
 * @returns {object}
 */
app.get("/json/:uuid", (req: Request, res: Response) => {
  // Check if token exists
  const token = req.query.token as string;
  if (!token) {
    return res.status(401).send({ error: "Token is required" });
  }

  if (isTokenValid(token)) {
    // Checking if file exists
    if (fs.existsSync(`./db/files/${req.params.uuid}.json`)) {
      // Reading file
      const file = fs.readFileSync(
        `./db/files/${req.params.uuid}.json`,
        "utf8"
      );
      // Parsing file
      const json = JSON.parse(file);
      // Sending JSON
      res.send(json);
    } else {
      // File not found
      res.status(404).send({ error: "File not found" });
    }
  }

  return res.status(401).send({ error: "Token is invalid" });
});

/** Create file
 * @route POST /json/create
 * @returns {object}
 */
app.post("/json/create", (req: Request, res: Response) => {
  // Check if token exists
  const token = req.query.token as string;
  if (!token) {
    return res.status(401).send({ error: "Token is required" });
  }

  if (isTokenValid(token)) {
    // ...
  }

  return res.status(401).send({ error: "Token is invalid" });
});
