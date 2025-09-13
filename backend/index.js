const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;
const DB_FILE = path.join(__dirname, "..", "db.json");

app.use(cors());
app.use(bodyParser.json());

function loadDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}
function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

app.get("/:collection", (req, res) => {
  const db = loadDB();
  const collection = db[req.params.collection];
  if (!collection) return res.status(404).send("Collection not found");
  res.json(collection);
});

app.get("/:collection/:id", (req, res) => {
  const db = loadDB();
  const collection = db[req.params.collection];
  if (!collection) return res.status(404).send("Collection not found");
  const item = collection.find(i => String(i.id) === String(req.params.id));
  if (!item) return res.status(404).send("Item not found");
  res.json(item);
});

app.post("/:collection", (req, res) => {
  const db = loadDB();
  const collection = db[req.params.collection];
  if (!collection) return res.status(404).send("Collection not found");
  const newItem = { id: Date.now(), ...req.body };
  collection.push(newItem);
  db[req.params.collection] = collection;
  saveDB(db);
  res.status(201).json(newItem);
});

app.put("/:collection/:id", (req, res) => {
  const db = loadDB();
  const collection = db[req.params.collection];
  if (!collection) return res.status(404).send("Collection not found");
  const index = collection.findIndex(i => String(i.id) === String(req.params.id));
  if (index === -1) return res.status(404).send("Item not found");
  collection[index] = { ...collection[index], ...req.body };
  db[req.params.collection] = collection;
  saveDB(db);
  res.json(collection[index]);
});

app.delete("/:collection/:id", (req, res) => {
  const db = loadDB();
  const collection = db[req.params.collection];
  if (!collection) return res.status(404).send("Collection not found");
  const index = collection.findIndex(i => String(i.id) === String(req.params.id));
  if (index === -1) return res.status(404).send("Item not found");
  const deleted = collection.splice(index, 1);
  db[req.params.collection] = collection;
  saveDB(db);
  res.json(deleted[0]);
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
