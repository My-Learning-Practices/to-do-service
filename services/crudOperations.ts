import { PrismaClient, TaskDetails } from "@prisma/client";
const prisma = new PrismaClient();

const upsertTask = async (task: TaskDetails) => {
  try {
    await prisma.taskDetails.upsert({
      create: {
        ...task,
      },
      update: {
        taskName: task.taskName,
        createdAt: task.createdAt,
        deadline: task.deadline,
        priority: task.priority,
      },
      where: {
        id: await findTask(task.taskName),
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const findAllTask = async (priority?: string) =>
  await prisma.taskDetails.findMany();

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
  upsertTask,
  findAllTask,
  deleteTask,
};
