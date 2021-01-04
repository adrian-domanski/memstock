import React, { useState, useContext } from "react";
import Layout from "../components/layout/Layout/Layout";
import {
  ContentBody,
  ContentFooter,
  LogoSubText,
  Button,
  Input,
} from "../utils/styled/components/components";
import { Logo } from "../utils/styled/components/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import {
  CustomContentHeader,
  ExtendedLogoWrapper,
  Separator,
  StyledForm,
} from "../utils/styled/pages/authPages";
import validator from "validator";
import { useMutation } from "@apollo/react-hooks";
import { registerMutation } from "../queries/userQueries";
import { AuthContext } from "../context/authContext";
import Alert from "../components/Alert";
import { withRouter, SingletonRouter } from "next/router";
import AuthWithProviders from "../components/LoginWithProviders/AuthWithProviders";

interface Props {
  router: SingletonRouter;
}

const RegisterPage: React.FC<Props> = ({ router }) => {
  const { dispatch } = useContext(AuthContext);
  const [alert, setAlert] = useState({ type: "", msg: "" });
  const [register] = useMutation(registerMutation);
  const [recaptcha, setRecaptcha] = useState(process.env.isDev);
  const [errors, setErrors] = useState({
    USERNAME: "",
    EMAIL: "",
    PASSWORD: "",
    SAME_PASSWORDS: "",
    ALL_FIELDS_FILLED: "",
  });
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = ({
    target: { value, name },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [name]: value });
  };

  const handleValidate = () => {
    let currentErrors = {
      USERNAME: "",
      EMAIL: "",
      PASSWORD: "",
      SAME_PASSWORDS: "",
      ALL_FIELDS_FILLED: "",
    };

    if (
      !credentials.username ||
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword ||
      !recaptcha
    ) {
      currentErrors = {
        ...currentErrors,
        ALL_FIELDS_FILLED:
          "Proszę wypełnić wszystkie informacje oraz zaznaczyć pole ReCAPTCHA",
      };
      setAlert({ msg: "Proszę wypełnić wszystkie pola", type: "danger" });
    } else {
      if (
        !credentials.username.match(
          /^(?=.{3,14}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
        )
      ) {
        currentErrors = {
          ...currentErrors,
          USERNAME:
            "Nazwa użytkownika musi zawierać od 3 do 14 znaków. Może składać się wyłącznie z liter, cyfr oraz znaków takich jak . lub _ użytych w celu połączenia wyrazów.",
        };
      }
      if (!validator.isEmail(credentials.email)) {
        currentErrors = {
          ...currentErrors,
          EMAIL: "Niepoprawny adres email",
        };
      }
      if (credentials.password.length < 6) {
        currentErrors = {
          ...currentErrors,
          PASSWORD: "Hasło musi zawierać minimum 6 znaków",
        };
      }
      if (credentials.password !== credentials.confirmPassword) {
        currentErrors = {
          ...currentErrors,
          SAME_PASSWORDS: "Hasła nie są identyczne",
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
      setAlert({ msg: "Proszę czekać...", type: "warning" });
      try {
        const { data } = await register({
          variables: {
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
          },
        });

        dispatch({
          type: "REGISTER_SUCCESS",
          payload: { user: data.register.user, token: data.register.jwt },
        });
        setAlert({ msg: "Konto zostało utworzone", type: "success" });
        router.push("/");
      } catch (err) {
        setAlert({
          msg: "Użytkownik o takiej nazwie lub adresie email już istnieje",
          type: "danger",
        });
        dispatch({ type: "REGISTER_ERROR" });
      }
    }
  };

  return (
    <Layout>
      <CustomContentHeader>
        <ExtendedLogoWrapper>
          <Logo className="is-size-1">
            <span>Mem</span>Stock
          </Logo>
          <LogoSubText className="is-size-4 is-size-5-mobile is-family-primary">
            Dołącz do naszej społeczności
          </LogoSubText>
        </ExtendedLogoWrapper>
      </CustomContentHeader>
      <ContentBody>
        <StyledForm onSubmit={handleSubmit} action="submit">
          <Alert
            alert={alert}
            clearAlert={() => setAlert({ msg: "", type: "" })}
          />
          <div className="field">
            <label className="label" htmlFor="username">
              Nazwa użytkownika
            </label>
            <div className="control has-icons-left">
              <Input
                className={`input ${
                  errors.USERNAME || errors.ALL_FIELDS_FILLED ? "is-danger" : ""
                }`}
                type="text"
                placeholder="Nazwa użytkownika (widoczna publicznie)"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </div>
            {errors.USERNAME && (
              <p className="help is-danger">{errors.USERNAME}</p>
            )}
          </div>
          <div className="field">
            <label className="label" htmlFor="email">
              Email
            </label>
            <div className="control has-icons-left">
              <Input
                className={`input ${
                  errors.EMAIL || errors.ALL_FIELDS_FILLED ? "is-danger" : ""
                }`}
                type="email"
                id="email"
                name="email"
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
          <div className="field">
            <label className="label" htmlFor="password">
              Hasło
            </label>
            <div className="control has-icons-left">
              <Input
                className={`input ${
                  errors.PASSWORD ||
                  errors.SAME_PASSWORDS ||
                  errors.ALL_FIELDS_FILLED
                    ? "is-danger"
                    : ""
                }`}
                type="password"
                placeholder="Hasło do twojego konta"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
            {errors.PASSWORD && (
              <p className="help is-danger">{errors.PASSWORD}</p>
            )}
            {errors.SAME_PASSWORDS && (
              <p className="help is-danger">{errors.SAME_PASSWORDS}</p>
            )}
          </div>
          <div className="field">
            <label className="label" htmlFor="confirmPassword">
              Powtórz hasło
            </label>
            <div className="control has-icons-left has-icons-right">
              <Input
                className={`input ${
                  errors.PASSWORD ||
                  errors.SAME_PASSWORDS ||
                  errors.ALL_FIELDS_FILLED
                    ? "is-danger"
                    : ""
                }`}
                type="password"
                placeholder="Powtórz hasło do konta"
                id="confirmPassword"
                name="confirmPassword"
                value={credentials.confirmPassword}
                onChange={handleChange}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </div>
            {errors.SAME_PASSWORDS && (
              <p className="help is-danger">{errors.SAME_PASSWORDS}</p>
            )}
          </div>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={(value) => setRecaptcha(value)}
            className="margin-auto is-block my-4"
          />

          <Button className="is-primary light margin-auto mb-5 px-6">
            Zarejestruj się
          </Button>
        </StyledForm>
        <Separator />
        <AuthWithProviders type="REGISTER" />
      </ContentBody>
      <ContentFooter className="has-text-centered">
        Masz już konto?{" "}
        <Link href="/logowanie">
          <a className="has-text-primary has-text-weight-bold">Zaloguj się</a>
        </Link>
      </ContentFooter>
    </Layout>
  );
};

export default withRouter(RegisterPage);
