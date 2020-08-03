import React from "react";

interface Props {
  alert: {
    type: string;
    msg: string;
  };
  clearAlert: () => void;
}

const Alert: React.FC<Props> = ({ alert, clearAlert }) => {
  return (
    alert.msg && (
      <div className={`notification is-${alert.type} is-light`}>
        <button className="delete" onClick={clearAlert}></button>
        {alert.msg}
      </div>
    )
  );
};

export default Alert;
