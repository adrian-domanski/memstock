import React, { useState, useContext } from "react";
import Layout from "../components/layout/Layout";
import {
  ContentBody,
  ContentFooter,
  LogoSubText,
  Button,
} from "../utils/styled/components/components";
import { Logo } from "../utils/styled/components/Navbar";
import Link from "next/link";
import {
  CustomPageWrapper,
  CustomContentHeader,
  ExtendedLogoWrapper,
  StyledForm,
} from "../utils/styled/pages/authPages";
import validator from "validator";
import { useMutation } from "@apollo/react-hooks";
import { loginMutation } from "../queries/userQueries";
import { AuthContext } from "../context/authContext";
import { withRouter, SingletonRouter } from "next/router";
import Alert from "../components/Alert";

interface Props {
  router: SingletonRouter;
}

const LoginPage: React.FC<Props> = ({ router }) => {
  const { dispatch } = useContext(AuthContext);
  const [login] = useMutation(loginMutation);
  const [alert, setAlert] = useState({ type: "", msg: "" });
  const [errors, setErrors] = useState({
    EMAIL: "",
    PASSWORD: "",
    ALL_FIELDS_FILLED: "",
  });
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({
    target: { value, id },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [id]: value });
  };

  const handleValidate = () => {
    let currentErrors = {
      EMAIL: "",
      PASSWORD: "",
      ALL_FIELDS_FILLED: "",
    };

    if (!credentials.email || !credentials.password) {
      currentErrors = {
        ...currentErrors,
        ALL_FIELDS_FILLED: "Proszę podać login i hasło",
      };
    } else {
      if (!validator.isEmail(credentials.email)) {
        currentErrors = {
          ...currentErrors,
          EMAIL: "Niepoprawny adres email",
        };
      }
    }

    setErrors(currentErrors);

    for (let p in currentErrors) {
      if (currentErrors[p]) return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (handleValidate()) {
      setAlert({ msg: "Proszę czekać", type: "warning" });
      try {
        const { data } = await login({
          variables: {
            identifier: credentials.email,
            password: credentials.password,
          },
        });

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user: data.login.user, token: data.login.jwt },
        });

        setAlert({ msg: "Zostałeś zalogowany", type: "success" });
        router.push("/");
      } catch (err) {
        setAlert({ msg: "Nieprawidłowy login i/lub hasło", type: "danger" });
        dispatch({ type: "LOGIN_ERROR" });
      }
    }
  };

  return (
    <Layout>
      <CustomPageWrapper>
        <CustomContentHeader>
          <ExtendedLogoWrapper>
            <Logo className="is-size-1">
              <span>Mem</span>Stock
            </Logo>
            <LogoSubText className="is-size-4 is-family-primary">
              Witaj ponownie przywoływaczu
            </LogoSubText>
          </ExtendedLogoWrapper>
        </CustomContentHeader>
        <ContentBody>
          <StyledForm onSubmit={handleSubmit} action="submit">
            {errors.ALL_FIELDS_FILLED && (
              <div className="notification is-danger is-light">
                {errors.ALL_FIELDS_FILLED}
              </div>
            )}

            <Alert
              alert={alert}
              clearAlert={() => setAlert({ msg: "", type: "" })}
            />

            <div className="field">
              <label className="label" htmlFor="email">
                Email
              </label>
              <div className="control has-icons-left">
                <input
                  className={`input ${
                    errors.EMAIL || errors.ALL_FIELDS_FILLED ? "is-danger" : ""
                  }`}
                  type="email"
                  id="email"
                  placeholder="Twój adres email"
                  value={credentials.email}
                  onChange={handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
              {errors.EMAIL && <p className="help is-danger">{errors.EMAIL}</p>}
            </div>
            <div className="field mb-5">
              <label className="label" htmlFor="password">
                Hasło
              </label>
              <div className="control has-icons-left">
                <input
                  className={`input ${
                    errors.ALL_FIELDS_FILLED ? "is-danger" : ""
                  }`}
                  type="password"
                  placeholder="Hasło do twojego konta"
                  id="password"
                  value={credentials.password}
                  onChange={handleChange}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
            </div>

            <Button className="is-primary light margin-auto mb-5 px-6">
              Zaloguj
            </Button>
          </StyledForm>
        </ContentBody>
        <ContentFooter className="has-text-centered">
          Nie masz jeszcze konta?{" "}
          <Link href="/logowanie">
            <a className="has-text-primary has-text-weight-bold">
              Zarejestruj się
            </a>
          </Link>
        </ContentFooter>
      </CustomPageWrapper>
    </Layout>
  );
};

export default withRouter(LoginPage);
