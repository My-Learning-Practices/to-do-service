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
    const filter = req.query.priority?.toString() || "";
    console.log(filter);

    res.send(await crudOperations.findAllTask(filter));
  })
  .post((req: express.Request, res: express.Response) => {
    const taskDeatils = req.body.taskDeatils;
    crudOperations.upsertTask(taskDeatils);
  })
  .delete(async (req: express.Request, res: express.Response) => {
    const taskId = req.body.id;
    await crudOperations.deleteTask(taskId);
  });

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
