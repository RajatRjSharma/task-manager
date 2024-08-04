import Task from "../models/task.js";
import taskSchema from "../schema/taskSchema.js";

/**
 * Api return object
 */
const returnObject = (status, data, message) => ({
  status,
  data,
  message,
});

/**
 * Task all routes for POST, GET, PUT, DELETE
 * @param {*} fastify : Fastify object
 */
export default async function taskRoutes(fastify) {
  /**
   * GET call handler
   *
   * @return return object with data as list of Task objects
   */
  fastify.get("/", async (_, response) => {
    try {
      const tasks = await Task.find();
      response.send(returnObject(true, tasks, "success"));
    } catch (error) {
      fastify.log.error("Error fetching tasks", error);
      response
        .status(500)
        .send(returnObject(false, null, "Internal Server Error"));
    }
  });

  /**
   * POST call handler
   * Will add a new task
   *
   * @return return object with added Task object
   */
  fastify.post("/", {
    schema: {
      body: taskSchema,
    },
    handler: async (request, response) => {
      {
        try {
          const task = new Task(request.body);
          await task.save();
          response.status(201).send(returnObject(true, task, "success"));
        } catch (error) {
          fastify.log.error("Error creating task", error);
          response
            .status(500)
            .send(returnObject(false, null, "Internal Server Error"));
        }
      }
    },
  });

  /**
   * PUT call handler
   * Will update a task
   *
   * @return return object with updated Task object
   */
  fastify.put("/:id", {
    schema: {
      body: taskSchema,
    },
    handler: async (request, response) => {
      try {
        const { id } = request.params;
        const task = request.body;
        const result = await Task.findByIdAndUpdate(id, task, {
          new: true,
          runValidators: true,
        });

        if (!result) {
          response
            .status(404)
            .send(
              returnObject(false, null, "Task not found or no changes made")
            );
        } else {
          response.send(returnObject(true, result, "success"));
        }
      } catch (error) {
        fastify.log.error("Error updating task", error);
        response
          .status(500)
          .send(returnObject(false, null, "Internal Server Error"));
      }
    },
  });

  /**
   * DELETE call handler
   * Will delete a task
   *
   * @return return object with deleted Task object
   */
  fastify.delete("/:id", async (request, response) => {
    try {
      const { id } = request.params;
      const result = await Task.findByIdAndDelete(id);

      if (!result) {
        response
          .status(404)
          .send(returnObject(false, null, "Task not found or no changes made"));
      } else {
        response.send(returnObject(true, result, "success"));
      }
    } catch (error) {
      fastify.log.error("Error deleting task", error);
      response
        .status(500)
        .send(returnObject(false, null, "Internal Server Error"));
    }
  });
}
