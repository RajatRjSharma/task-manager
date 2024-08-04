import Fastify from "fastify";
import taskRoutes from "../src/routes/taskRoutes";
import { expect, test, beforeEach, afterEach } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let fastify;
let mongoServer;

beforeEach(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
  fastify = Fastify();
  fastify.register(taskRoutes, { prefix: "/tasks" });
});

afterEach(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
  fastify.close();
});

//TEST 1
test("GET /tasks returns an empty array", async () => {
  const response = await fastify.inject({
    method: "GET",
    url: "/tasks",
  });
  expect(response.statusCode).toBe(200);
  expect(response.json()?.data).toEqual([]);
});

//TEST 2
test("POST /tasks creates a new task", async () => {
  const taskData = { taskName: "New Task", dueBy: "2024-08-04", status: "new" };

  const response = await fastify.inject({
    method: "POST",
    url: "/tasks",
    payload: taskData,
  });

  expect(response.statusCode).toBe(201);
  const createdTask = response.json()?.data;
  expect(createdTask.taskName).toMatch(taskData.taskName);
  expect(createdTask.dueBy?.split("T")[0]).toMatch(taskData.dueBy);
  expect(createdTask.status).toMatch(taskData.status);
  expect(createdTask).toHaveProperty("_id");
});

//TEST 3
test("POST /tasks creates a new task with invalid payload", async () => {
  const taskData = { taskName: "New Task", dueBy: "2024-08", status: "new" };

  const response = await fastify.inject({
    method: "POST",
    url: "/tasks",
    payload: taskData,
  });

  expect(response.statusCode).toBe(400);
  const message = response.json()?.message;
  expect(message).toMatch('body/dueBy must match format "date"');
});

//TEST 4
test("PUT /tasks/:id updates an existing task", async () => {
  const taskData = { taskName: "New Task", dueBy: "2024-08-04", status: "new" };

  const createdResponse = await fastify.inject({
    method: "POST",
    url: "/tasks",
    payload: taskData,
  });

  const task = createdResponse.json()?.data;

  const updatedData = {
    taskName: "Update Task",
    dueBy: "2024-08-05",
    status: "new",
  };
  const updateResponse = await fastify.inject({
    method: "PUT",
    url: `/tasks/${task._id}`,
    payload: updatedData,
  });

  expect(updateResponse.statusCode).toBe(200);
  const updatedTask = updateResponse.json()?.data;
  expect(updatedTask.taskName).toMatch(updatedData.taskName);
  expect(updatedTask.dueBy?.split("T")[0]).toMatch(updatedData.dueBy);
  expect(updatedTask.status).toMatch(updatedData.status);
});

//TEST 5
test("DELETE /tasks/:id deletes an existing task", async () => {
  const taskData = { taskName: "New Task", dueBy: "2024-08-04", status: "new" };

  const createdResponse = await fastify.inject({
    method: "POST",
    url: "/tasks",
    payload: taskData,
  });

  const task = createdResponse.json()?.data;

  const deleteResponse = await fastify.inject({
    method: "DELETE",
    url: `/tasks/${task._id}`,
  });

  expect(deleteResponse.statusCode).toBe(200);
  expect(deleteResponse.json()?.message).toEqual("success");

  const getResponse = await fastify.inject({
    method: "GET",
    url: "/tasks",
  });
  const tasks = getResponse.json()?.data;
  expect(tasks).not.toContainEqual(expect.objectContaining({ _id: task._id }));
});
