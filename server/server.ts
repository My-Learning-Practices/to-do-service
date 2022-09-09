import crudOperations from "../services/crudOperations";
import express from "express";

var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app
  .route("/")
  .get(async (req: express.Request, res: express.Response) => {
    console.log("Fetching all tasks");
    res.send(await crudOperations.findAllTask());
  })
  .post((req: express.Request, res: express.Response) => {
    const taskDeatils = req.body.taskDeatils;
    crudOperations.upsertTask(taskDeatils);
  })
  .delete(async (req: express.Request, res: express.Response) => {
    const taskId = req.body.id;
    await crudOperations.deleteTask(taskId);
  });

app
  .route("/:priority")
  .get(async (req: express.Request, res: express.Response) => {
    const param = req.params.priority;
    res.send(await crudOperations.findAllTask(param));
  });

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
