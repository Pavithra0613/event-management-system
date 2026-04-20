const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('frontend'));


const USERS_FILE = "./backend/users.json";


function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
}


function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}


app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const userExists = users.find((u) => u.username === username);
  if (userExists) {
    return res.status(400).json({ message: "Username already taken" });
  }

  users.push({ username, password });
  writeUsers(users);
  res.json({ message: "Signup successful" });
});


app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const validUser = users.find((u) => u.username === username && u.password === password);
  if (validUser) {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
