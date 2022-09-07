import crudOperations from "../services/crudOperations";

const express = require("express");
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Get all todos
app.get("/", async (req: any, res: any) => {
  console.log("Fetching all tasks");
  res.send(await crudOperations.findAllTask());
});

// Add or update a task
app.post("/", (req: any, res: any) => {
  const taskDeatils = req.body.taskDeatils;
  console.log(taskDeatils);

  crudOperations.upsertTask(taskDeatils);
});

app.delete("/", async (req: any, res: any) => {
  const taskId = req.body.id;
  await crudOperations.deleteTask(taskId);
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
