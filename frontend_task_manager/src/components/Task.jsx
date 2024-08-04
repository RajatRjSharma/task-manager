import React from "react";
import completeSvg from "../assets/complete.svg";
import newSvg from "../assets/new.svg";
import ongoingSvg from "../assets/ongoing.svg";
import deleteSvg from "../assets/delete.svg";
import editSvg from "../assets/edit.svg";
import { deleteTask } from "../apis/apiService";
import { useDispatch } from "react-redux";
import { setForm } from "../slices/taskSlice";
import Tooltip from "./Tooltip";
import PropTypes from "prop-types";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  let statusColor = ["#f87171", "#dc2626"];
  let img = newSvg;

  switch (task?.status) {
    case "ongoing":
      statusColor = ["#facc15", "#ca8a04"];
      img = ongoingSvg;
      break;
    case "completed":
      statusColor = ["#4ade80", "#16a34a"];
      img = completeSvg;
      break;
  }

  return (
    <li className="py-2 px-3 shadow-md rounded-md w-full bg-gray-100 my-2">
      <div className="flex items-center gap-2 w-full">
        <div className="flex gap-3 items-center flex-1 w-full">
          <Tooltip text={task?.status || ""}>
            <div
              className="h-12 w-12 rounded-full border-2 flex justify-center items-center"
              style={{
                backgroundColor: statusColor[0],
                borderColor: statusColor[1],
              }}
            >
              <img src={img} className="h-6" alt="task_status" />
            </div>
          </Tooltip>
          <div
            className="flex flex-col pb-1 w-full break-all break-words gap-1"
            style={{
              hyphens: "auto",
            }}
          >
            <p
              className="text-xl font-medium text-gray-900 break-all break-words"
              style={{
                hyphens: "auto",
              }}
            >
              {task?.taskName || ""}
            </p>
            <p
              className="text-sm text-gray-600"
              style={{
                color:
                  new Date(task?.dueBy) > new Date() ? "#4b5563" : "#dc2626",
              }}
            >
              <span className="font-semibold text-gray-900 mr-1">Due :</span>
              {task?.dueBy?.toString()?.trim()
                ? new Date(task?.dueBy).toDateString()
                : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center text-base font-semibold text-gray-900 gap-2">
          <Tooltip text="Edit">
            <button
              type="button"
              className="text-gray-700 hover:bg-gray-300 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
              onClick={() => {
                dispatch(
                  setForm({ active: true, content: { ...task }, isEdit: true })
                );
              }}
            >
              <img src={editSvg} className="h-5" alt="edit_task" />
            </button>
          </Tooltip>
          <Tooltip text="Delete">
            <button
              type="button"
              className="text-gray-700 hover:bg-gray-300 hover:text-white focus:ring-4 focus:outline-none focus:ring-gray-400 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center"
              onClick={() => task?._id && dispatch(deleteTask(task?._id))}
            >
              <img src={deleteSvg} className="h-5" alt="delete_task" />
            </button>
          </Tooltip>
        </div>
      </div>
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    taskName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    dueBy: PropTypes.string.isRequired,
  }).isRequired,
};

export default Task;
