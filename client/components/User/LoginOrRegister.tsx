import React from "react";
import styled from "styled-components";
import { ContentBody } from "../../utils/styled/components/components";
import Link from "next/link";

const StyledContentBody = styled(ContentBody)`
  background: ${({ theme }) => theme.colors.dark800};
`;

interface IProps {
  className?: string;
  customText?: string;
}

const LoginOrRegister: React.FC<IProps> = ({
  className = "",
  customText = "",
}) => {
  return (
    <StyledContentBody className={className}>
      <Link href="/logowanie">
        <a className="is-link">Zaloguj się</a>
      </Link>{" "}
      lub{" "}
      <Link href="/rejestracja">
        <a className="is-link">zarejestruj</a>
      </Link>
      , aby {customText}
    </StyledContentBody>
  );
};

export default LoginOrRegister;
