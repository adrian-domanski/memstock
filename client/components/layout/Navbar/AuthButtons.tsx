import React from "react";
import { StyledAuthButtons } from "../../../utils/styled/components/Navbar";
import { Button } from "../../../utils/styled/components/components";
import Link from "next/link";

interface IProps {
  className?: string;
}

const AuthButtons: React.FC<IProps> = ({ className = "" }) => {
  return (
    <StyledAuthButtons className={`buttons ${className}`}>
      <Link href="/rejestracja">
        <Button as="a" className="is-primary is-size-6 px-4 mr-4">
          Rejestracja
        </Button>
      </Link>
      <Link href="/logowanie">
        <Button as="a" className="is-primary light is-size-6 px-4">
          Logowanie
        </Button>
      </Link>
    </StyledAuthButtons>
  );
};

export default AuthButtons;
