import React from "react";
import "./notification.css";
import PropTypes from "prop-types";

const NotificationItem = ({ message, type = "info", onClose }) => {
  if (!message) return null;

  return (
    <div className={`gap-2 notification ${type}`}>
      <span className="break-all break-words">{message}</span>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

NotificationItem.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default NotificationItem;
