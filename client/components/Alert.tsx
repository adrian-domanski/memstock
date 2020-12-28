import React from "react";
import { StyledAlert } from "../utils/styled/components/Alert";

interface IProps {
  alert: {
    type: string;
    msg: string;
  };
  clearAlert: () => void;
  maxWidth?: number;
  isCentered?: boolean;
  className?: string;
}

const Alert: React.FC<IProps> = ({
  alert,
  clearAlert,
  isCentered,
  maxWidth,
  className,
}) => {
  return (
    alert.msg && (
      <StyledAlert
        maxWidth={maxWidth}
        isCentered={isCentered}
        className={`notification is-${alert.type} is-light ${className}`}
      >
        <button className="delete" onClick={clearAlert}></button>
        {alert.msg}
      </StyledAlert>
    )
  );
};

export default Alert;
