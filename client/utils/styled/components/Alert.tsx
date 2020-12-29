import styled from "styled-components";

interface StyledAlertProps {
  maxWidth?: number;
  isCentered?: boolean;
}
export const StyledAlert = styled.div<StyledAlertProps>`
  max-width: ${(props) => (props.maxWidth ? props.maxWidth + "px" : "auto")};
  margin: ${(props) => (props.isCentered ? "0 auto" : "unset")};
`;
