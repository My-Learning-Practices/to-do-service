import { PrismaClient, TaskDetails } from "@prisma/client";
const prisma = new PrismaClient();

const createTask = async (task: TaskDetails) => {
  if (findTask(task.taskName) !== undefined)
    updatedtask(task); // If task with same name exist just update it
  else {
    try {
      await prisma.taskDetails.create({
        data: {
          ...task,
          // taskName: task.taskName,
          // createdAt: task.createdAt,
          // deadline: task.deadline,
          // priority: task.priority,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
};

const updatedtask = async (task: TaskDetails) => {
  try {
    await prisma.taskDetails.update({
      data: {
        taskName: task.taskName,
        createdAt: task.createdAt,
        deadline: task.deadline,
        priority: task.priority,
      },
      where: {
        id: task.id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const findAllTask = async (priority: string) => {
  if (priority.length > 0)
    return await prisma.taskDetails.findMany({
      where: {
        priority: priority,
      },
    });
  else return await prisma.taskDetails.findMany();
};

const deleteTask = async (taskId: string) => {
  await prisma.taskDetails.delete({
    where: {
      id: taskId,
    },
  });
};

const findTask = async (taskName: string) =>
  await prisma.taskDetails
    .findFirst({
      where: {
        taskName: taskName,
      },
    })
    .then((task) => task?.id);

export default {
  createTask,
  findAllTask,
  deleteTask,
};
