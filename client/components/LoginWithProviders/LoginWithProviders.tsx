import Link from "next/link";
import React from "react";
import {
  LoginProvidersWrapper,
  LoginWithFacebook,
  LoginWithGoogle,
} from "./styled";

const LoginWithProviders = () => {
  return (
    <LoginProvidersWrapper>
      <Link href={`${process.env.SERVER_URL}/connect/google`} passHref>
        <LoginWithGoogle>
          <p>Zaloguj przez Google</p>
        </LoginWithGoogle>
      </Link>
      <Link href={`${process.env.SERVER_URL}/connect/facebook`} passHref>
        <LoginWithFacebook>
          <i className="fab fa-facebook-square" />
          <p>Zaloguj przez Facebook</p>
        </LoginWithFacebook>
      </Link>
    </LoginProvidersWrapper>
  );
};

export default LoginWithProviders;
