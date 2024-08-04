import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTask } from "../apis/apiService";
import Task from "./Task";

const ListTasks = () => {
  let dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getTask());
  }, [dispatch]);

  return (
    <main className="h-full w-full px-[3%] pt-[60px] sm:px-[8%] md:px-[20%] bg-gray-50">
      <ul className="w-full mb-10">
        {tasks?.map((task, index) => (
          <Task key={task?._id || index} task={task}></Task>
        ))}
      </ul>
      {!tasks?.length && (
        <p className="text-2xl font-medium text-gray-900 text-center mt-10">
          No task found, Please add some.
        </p>
      )}
    </main>
  );
};

export default ListTasks;
