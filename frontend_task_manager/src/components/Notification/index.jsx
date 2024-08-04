import React, { useEffect } from "react";
import "./notification.css";
import NotificationItem from "./NotificationItem";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../../slices/taskSlice";

export const Notification = () => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.task);

  useEffect(() => {
    if (notification?.active)
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
  }, [notification, dispatch]);

  return (
    <div className="notifications-container">
      {notification?.active && (
        <NotificationItem
          message={notification.message}
          type={notification.type}
          onClose={() => {
            dispatch(clearNotification());
          }}
        />
      )}
    </div>
  );
};

export default Notification;
