//Payload schema validation
const taskSchema = {
  type: "object",
  required: ["taskName", "dueBy", "status"],
  properties: {
    taskName: {
      type: "string",
      pattern: "^.{1,}$",
    },
    dueBy: { type: "string", format: "date" },
    status: { type: "string", enum: ["new", "ongoing", "completed"] },
  },
};

export default taskSchema;
