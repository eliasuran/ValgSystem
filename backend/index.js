import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./authMiddleware.js";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => console.log("Server running on port 3000"));

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: process.env.PASSWORD,
  database: "BakkaValg",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database");
  }
});

app.get("/candidates", (req, res) => {
  const query = "SELECT * FROM candidates";

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/users", authenticateToken, (req, res) => {
  const query = "SELECT * FROM users";

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get("/users/hasVoted", (req, res) => {
  const mail = req.body.mail;
  db.query(
    "SELECT hasVoted FROM users WHERE mail = ?",
    [mail],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Database error" });
      } else {
        const hasVoted = results.hasVoted;
        res.status(200).json({ hasVoted });
      }
    }
  );
});

app.post("/register", (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;
  db.query(
    "INSERT INTO users (mail, password) VALUES (?, ?)",
    [mail, password],
    (err) => console.log(err)
  );
});

app.post("/login", (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;
  db.query(
    "SELECT * FROM users WHERE mail = ? AND password = ?",
    [mail, password],
    (err, result) => {
      if (err) {
        res.status({ err: err });
      }
      if (result.length > 0) {
        const user = result[0];
        const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.send({ token: token, user: user });
      } else {
        res.send({
          message: "No user with this email and pass combo lil bou",
        });
      }
    }
  );
});

app.post("/vote", (req, res) => {
  const name = req.body.candidate;
  const user = req.body.user;
  db.query(
    "UPDATE candidates SET votes = votes + 1 WHERE name = ?",
    [name],
    (err) => console.log(err)
  );
  db.query("UPDATE users SET hasVoted = true WHERE mail = ?", [user], (err) => {
    if (err) {
      console.log(err);
    }

    return res.sendStatus(200);
  });
});
