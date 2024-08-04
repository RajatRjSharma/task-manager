import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import closeSvg from "../assets/close.svg";
import { clearForm } from "../slices/taskSlice";
import { addTask, updateTask } from "../apis/apiService";
import Tooltip from "./Tooltip";

const Form = () => {
  const dispatch = useDispatch();
  const { form } = useSelector((state) => state.task);

  const [taskRef, setTaskRef] = useState(null);
  const [dueByRef, setDueByRef] = useState(null);
  const [statusRef, setStatusRef] = useState(null);
  const [error, setError] = useState({});

  /**
   * Handle the addition of new task
   *
   * @param {*} e : Event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      taskName: taskRef?.value || "",
      dueBy: dueByRef?.value || "",
      status: statusRef?.value || "",
    };

    let valid = true;
    let error = {};

    if (!payload?.taskName?.trim()) {
      valid = false;
      error.task = "Enter valid task";
    }

    if (!payload?.dueBy?.trim()) {
      valid = false;
      error.due = "Enter valid due date";
    }

    if (!payload?.status?.trim()) {
      valid = false;
      error.status = "Select valid status";
    }

    setError(error);
    if (valid)
      if (form?.isEdit) dispatch(updateTask(form?.content?._id, payload));
      else dispatch(addTask(payload));
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-[#f0efef] rounded-md shadow-lg">
          <div className="flex items-center justify-between p-4 md:p-5 !pb-3 border-b rounded-t ">
            <h3 className="text-xl font-semibold text-gray-900 ">
              {form?.isEdit ? "Update Task" : "Add Task"}
            </h3>
            <Tooltip text="Close">
              <button
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                onClick={() => dispatch(clearForm())}
              >
                <img src={closeSvg} className="h-3" alt="task_status" />
              </button>
            </Tooltip>
          </div>
          <div className="p-4 md:p-5 !pt-3">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="task"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your Task
                </label>
                <input
                  type="text"
                  name="task"
                  id="task"
                  ref={setTaskRef}
                  defaultValue={form?.content?.taskName || ""}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
                  placeholder="Enter task"
                  required
                />
                {error?.task && (
                  <span className="text-red-500 text-sm ml-1">
                    {error?.task}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="due"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Due By
                </label>
                <input
                  type="date"
                  name="due"
                  id="due"
                  ref={setDueByRef}
                  defaultValue={form?.content?.dueBy?.split("T")[0] || ""}
                  placeholder="DD/MM/YYYY"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
                  required
                />
                {error?.due && (
                  <span className="text-red-500 text-sm ml-1">
                    {error?.due}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Status
                </label>
                <select
                  name="status"
                  id="status"
                  ref={setStatusRef}
                  defaultValue={form?.content?.status || ""}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
                  required
                >
                  <option value="" disabled>
                    Choose a status
                  </option>
                  <option value="new">New</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
                {error?.status && (
                  <span className="text-red-500 text-sm ml-1">
                    {error?.status}
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {form?.isEdit ? "Update Task" : "Add Task"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
