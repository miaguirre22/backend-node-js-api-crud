import express from "express";
import { v4 as uuidv4, v4 } from "uuid";
const router = express.Router();

// Mock database
const users = [
  {
    id: "1",
    first_name: "John",
    last_name: "Doe",
    email: "johndoe@example.com",
  },
  {
    id: "2",
    first_name: "Alice",
    last_name: "Smith",
    email: "alicesmith@example.com",
  },
];

// Getting the list of users from the mock database
router.get("/", (req, res) => {
  console.log("GET /users \n", users);
  res.send(users);
});

router.post("/", (req, res) => {
  const user = req.body;

  users.push({ ...user, id: uuidv4() });

  res.send(`${user.first_name} has been added to the Database`);

  console.log("POST /users \n", users);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id === id);

  // Todo: if foundUser === undefined
  
  res.send(foundUser);

  console.log(`GET /users/:${id} \n`, foundUser);
});

export default router;
