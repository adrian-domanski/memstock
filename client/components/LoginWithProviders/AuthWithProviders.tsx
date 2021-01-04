import Link from "next/link";
import React from "react";
import {
  LoginProvidersWrapper,
  LoginWithFacebook,
  LoginWithGoogle,
} from "./styled";

interface IProps {
  type?: "REGISTER" | "LOGIN";
}

const AuthWithProviders: React.FC<IProps> = ({ type = "LOGIN" }) => {
  return (
    <LoginProvidersWrapper>
      <Link href={`${process.env.SERVER_URL}/connect/google`} passHref>
        <LoginWithGoogle>
          <p>{type === "LOGIN" ? "Zaloguj" : "Zarejestruj"} przez Google</p>
        </LoginWithGoogle>
      </Link>
      <Link href={`${process.env.SERVER_URL}/connect/facebook`} passHref>
        <LoginWithFacebook>
          <i className="fab fa-facebook-square" />
          <p>{type === "LOGIN" ? "Zaloguj" : "Zarejestruj"} przez Facebook</p>
        </LoginWithFacebook>
      </Link>
    </LoginProvidersWrapper>
  );
};

export default AuthWithProviders;
