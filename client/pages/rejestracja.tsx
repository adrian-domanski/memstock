import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import {
  ContentBody,
  ContentFooter,
  LogoSubText,
  Button,
} from "../utils/styled/components/components";
import { Logo } from "../utils/styled/components/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import {
  CustomPageWrapper,
  CustomContentHeader,
  ExtendedLogoWrapper,
  StyledForm,
} from "../utils/styled/pages/rejestracja";
import validator from "validator";
import { error } from "console";

const rejestracja: React.FC = () => {
  const [recaptcha, setRecaptcha] = useState(false);
  const [alerts, setAlerts] = useState<
    {
      msg: string;
      type: "success" | "danger" | "";
    }[]
  >([]);
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
    console.log(credentials);
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
    } else {
      if (credentials.username.length < 3 || credentials.username.length > 16) {
        console.log(true);
        currentErrors = {
          ...currentErrors,
          USERNAME: "Nazwa użytkownika musi zawierać od 3 do 16 znaków",
        };
      }
      if (!validator.isAlphanumeric(credentials.username, "pl-PL")) {
        currentErrors = {
          ...currentErrors,
          USERNAME:
            "Nazwa użytkownika może składać się wyłącznie z liter oraz cyfr",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handleValidate()) {
      //  Create user
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
              Dołącz do naszej społeczności
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
            <div className="field">
              <label className="label">Nazwa użytkownika</label>
              <div className="control has-icons-left">
                <input
                  className={`input ${
                    errors.USERNAME || errors.ALL_FIELDS_FILLED
                      ? "is-danger"
                      : ""
                  }`}
                  type="text"
                  placeholder="Nazwa użytkownika (widoczna publicznie)"
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
              <label className="label">Email</label>
              <div className="control has-icons-left">
                <input
                  className={`input ${
                    errors.EMAIL || errors.ALL_FIELDS_FILLED ? "is-danger" : ""
                  }`}
                  type="email"
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
              <label className="label">Hasło</label>
              <div className="control has-icons-left">
                <input
                  className={`input ${
                    errors.PASSWORD ||
                    errors.SAME_PASSWORDS ||
                    errors.ALL_FIELDS_FILLED
                      ? "is-danger"
                      : ""
                  }`}
                  type="password"
                  placeholder="Hasło do twojego konta"
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
              <label className="label">Powtórz hasło</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className={`input ${
                    errors.PASSWORD ||
                    errors.SAME_PASSWORDS ||
                    errors.ALL_FIELDS_FILLED
                      ? "is-danger"
                      : ""
                  }`}
                  type="password"
                  placeholder="Powtórz hasło do konta"
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
              sitekey={process.env.RECAPTCHA_SITE_KEY}
              onChange={(value) => setRecaptcha(value)}
              className="margin-auto is-block mb-4"
            />

            <Button className="is-primary light margin-auto mb-5 px-6">
              Zarejestruj się
            </Button>
          </StyledForm>
        </ContentBody>
        <ContentFooter className="has-text-centered">
          Masz już konto?{" "}
          <Link href="/logowanie">
            <a className="has-text-primary has-text-weight-bold">Zaloguj się</a>
          </Link>
        </ContentFooter>
      </CustomPageWrapper>
    </Layout>
  );
};

export default rejestracja;
