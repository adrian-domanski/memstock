import { useMutation } from "@apollo/react-hooks";
import Link from "next/link";
import { SingletonRouter, withRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Alert from "../components/Alert";
import Layout from "../components/layout/Layout/Layout";
import { resetPasswordMutation } from "../queries/userQueries";
import {
  ContentHeader,
  StyledTitle,
  ContentBody,
  Input,
  Button,
  ContentFooter,
} from "../utils/styled/components/components";
import { StyledForm } from "../utils/styled/pages/authPages";

interface IProps {
  router: SingletonRouter;
}

const ChangePasswordPage: React.FC<IProps> = ({ router }) => {
  const code = router.query?.code;

  const [alert, setAlert] = useState({ msg: "", type: "" });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [timeoutState, setTimeoutState] = useState(null);
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [errors, setErrors] = useState({
    PASSWORD: "",
    SAME_PASSWORDS: "",
    ALL_FIELDS_FILLED: "",
  });

  const [resetPassword] = useMutation(resetPasswordMutation);

  // Check if code query param is available
  useEffect(() => {
    if (!code) {
      setAlert({
        type: "danger",
        msg:
          "Brak kodu autoryzacyjnego - zostaniesz przekierowany na stronę główną",
      });
      setTimeoutState(
        setTimeout(() => {
          router.push("/");
        }, 3000)
      );
    }
    return () => timeoutState && clearTimeout(timeoutState);
  }, []);

  const handleValidate = () => {
    let currentErrors = {
      PASSWORD: "",
      SAME_PASSWORDS: "",
      ALL_FIELDS_FILLED: "",
    };

    if (!password || !confirmPassword) {
      currentErrors = {
        ...currentErrors,
        ALL_FIELDS_FILLED: "Proszę wypełnić wszystkie pola",
      };
      setAlert({ msg: "Proszę wypełnić wszystkie pola", type: "danger" });
    } else {
      if (password.length < 6) {
        currentErrors = {
          ...currentErrors,
          PASSWORD: "Hasło musi zawierać minimum 6 znaków",
        };
      }
      if (password !== confirmPassword) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "password":
        return setPassword(e.target.value);
      case "confirmPassword":
        return setConfirmPassword(e.target.value);
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleValidate()) {
      setAlert({ msg: "Proszę czekać...", type: "warning" });
      try {
        await resetPassword({
          variables: { password, passwordConfirmation: confirmPassword, code },
        });
        setPasswordChangeSuccess(true);
        setAlert({
          msg:
            "Hasło zostało pomyślnie zmienione - za chwilę zostaniesz przekierowany na stronę główną",
          type: "success",
        });
        setTimeoutState(
          setTimeout(() => {
            router.push("/");
          }, 3000)
        );
      } catch (e) {
        console.log(e);
        setAlert({ msg: "Wystąpił błąd podczas zmiany hasła", type: "danger" });
      }
    }
  };

  return (
    <Layout>
      <ContentHeader>
        <StyledTitle className="has-text-centered">Zmiana hasła</StyledTitle>
      </ContentHeader>
      <ContentBody>
        <Alert
          className="mt-4"
          isCentered
          maxWidth={700}
          alert={alert}
          clearAlert={() => setAlert({ msg: "", type: "" })}
        />
        {passwordChangeSuccess ? (
          <Link href="/" passHref>
            <Button as="a" className="is-primary light margin-auto my-4 px-6">
              Strona główna
            </Button>
          </Link>
        ) : (
          <StyledForm onSubmit={handleSubmit} action="submit">
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
                  placeholder="Nowe hasło do konta"
                  id="password"
                  name="password"
                  value={password}
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
                  placeholder="Powtórz nowe hasło"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
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

            <Button
              type="submit"
              className="is-primary light margin-auto my-4 px-6"
            >
              Zmień hasło
            </Button>
          </StyledForm>
        )}
      </ContentBody>
      <ContentFooter className="has-text-centered has-text-grey-light"></ContentFooter>
    </Layout>
  );
};

export default withRouter(ChangePasswordPage);
