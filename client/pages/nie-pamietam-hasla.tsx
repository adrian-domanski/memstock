import React, { useState } from "react";
import validator from "validator";
import Alert from "../components/Alert";
import Layout from "../components/layout/Layout/Layout";
import {
  Button,
  ContentBody,
  ContentFooter,
  ContentHeader,
  Input,
  StyledTitle,
} from "../utils/styled/components/components";
import { StyledForm } from "../utils/styled/pages/authPages";
import axios from "axios";

const ForgottenPassword = () => {
  const [alert, setAlert] = useState({ msg: "", type: "" });
  const [emailError, setEmailError] = useState(false);

  const [email, setEmail] = useState("");

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAlert({ msg: "Proszę czekać...", type: "warning" });

    // Validation
    if (!email) {
      setEmailError(true);
      return setAlert({ type: "danger", msg: "Proszę wprowadzić adres email" });
    }

    if (!validator.isEmail(email)) {
      setEmailError(true);
      return setAlert({
        type: "danger",
        msg: "Niepoprawny format adresu email",
      });
    }

    // Make a request
    try {
      await axios.post(`${process.env.SERVER_URL}/auth/forgot-password`, {
        email,
      });

      setEmail("");
      setEmailError(false);
      setAlert({
        type: "success",
        msg:
          "Wiadomość została wysłana na Twój adres email. <b>Sprawdź folder ze spamem!</b>",
      });
    } catch (e) {
      if (
        e?.response.data?.data?.[0]?.messages[0]?.id ===
        "Auth.form.error.user.not-exist"
      ) {
        return setAlert({
          type: "danger",
          msg:
            "Użytkownik o takim adresie email nie istnieje w naszym serwisie.",
        });
      } else {
        setAlert({
          type: "danger",
          msg: "Wystąpił błąd podczas wysyłania wiadomości email.",
        });
      }
    }
  };

  return (
    <Layout>
      <ContentHeader>
        <StyledTitle className="has-text-centered">
          Zapomniane hasło
        </StyledTitle>
      </ContentHeader>
      <ContentBody>
        <ContentBody>
          <StyledForm onSubmit={handleSubmit} action="submit">
            <Alert
              alert={alert}
              clearAlert={() => setAlert({ msg: "", type: "" })}
            />

            <div className="field">
              <label className="label" htmlFor="email">
                Email
              </label>
              <div className="control has-icons-left">
                <Input
                  className={`input ${emailError ? "is-danger" : ""}`}
                  type="email"
                  id="email"
                  placeholder="Twój adres email"
                  value={email}
                  onChange={handleChangeEmail}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
            </div>

            <Button className="is-primary light margin-auto my-4 px-6">
              Wyślij link do zmiany hasła
            </Button>
          </StyledForm>
        </ContentBody>
      </ContentBody>
      <ContentFooter className="has-text-centered has-text-grey-light">
        Możliwość przypomnienia hasła istnieje jedynie w przypadku konta
        założonego w standardowy sposób (bez użycia konta Google lub Facebook)
      </ContentFooter>
    </Layout>
  );
};

export default ForgottenPassword;
