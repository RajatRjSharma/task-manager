import axios from "axios";
import {
  clearForm,
  setLoader,
  setNotification,
  setTasks,
} from "../slices/taskSlice";
import endpoints from "./endpoints";

/**
 * Method to create a api request.
 *
 * @param {*} url : Api route
 * @param {*} method : HTTP Method (GET, POST, etc)
 * @param {*} data : Payload for POST or PUT
 * @returns
 */
export const createRequest = async (url, method, data = {}) => {
  try {
    const response = await axios({ url, method, data });
    return response.data;
  } catch (error) {
    console.error("REQUEST ERROR : ", error);
    throw error;
  }
};

/**
 * Method to handle GET tasks api call
 */
export const getTask = () => async (dispatch) => {
  try {
    dispatch(setLoader(true));
    const tasks = await createRequest(`${endpoints.TASKS}`, "GET");
    dispatch(setTasks(tasks?.data || []));
    dispatch(setLoader(false));
  } catch (error) {
    dispatch(setLoader(false));
    dispatch(
      setNotification({
        active: true,
        message: error?.response?.data?.message || "Error fetching tasks",
        type: "error",
      })
    );
  }
};

/**
 * Method to handle DELETE task api call
 *
 * @param {*} id : Task id to delete
 */
export const deleteTask = (id) => async (dispatch) => {
  if (id) {
    try {
      dispatch(setLoader(true));
      const result = await createRequest(`${endpoints.TASKS}/${id}`, "DELETE");
      dispatch(setLoader(false));
      dispatch(getTask());
      if (result?.status)
        dispatch(
          setNotification({
            active: true,
            message: "Task deleted successfully",
            type: "success",
          })
        );
    } catch (error) {
      dispatch(setLoader(false));
      dispatch(
        setNotification({
          active: true,
          message: error?.response?.data?.message || "Error deleting task",
          type: "error",
        })
      );
    }
  }
};

/**
 * Method to handle POST add task api call
 *
 * @param {*} data : Task payload to be added
 */
export const addTask = (data) => async (dispatch) => {
  if (data) {
    try {
      dispatch(setLoader(true));
      const result = await createRequest(`${endpoints.TASKS}`, "POST", data);
      dispatch(clearForm());
      dispatch(setLoader(false));
      dispatch(getTask());
      if (result?.status)
        dispatch(
          setNotification({
            active: true,
            message: "Task added successfully",
            type: "success",
          })
        );
    } catch (error) {
      dispatch(setLoader(false));
      dispatch(
        setNotification({
          active: true,
          message: error?.response?.data?.message || "Error adding task",
          type: "error",
        })
      );
    }
  }
};

/**
 * Method to handle PUT update task api call
 *
 * @param {*} id : Task id to update
 * @param {*} data : Task payload to update
 */
export const updateTask = (id, data) => async (dispatch) => {
  if (id && data) {
    try {
      dispatch(setLoader(true));
      const result = await createRequest(
        `${endpoints.TASKS}/${id}`,
        "PUT",
        data
      );
      dispatch(clearForm());
      dispatch(setLoader(false));
      dispatch(getTask());
      if (result?.status)
        dispatch(
          setNotification({
            active: true,
            message: "Task updated successfully",
            type: "success",
          })
        );
    } catch (error) {
      dispatch(setLoader(false));
      dispatch(
        setNotification({
          active: true,
          message: error?.response?.data?.message || "Error updating task",
          type: "error",
        })
      );
    }
  }
};
