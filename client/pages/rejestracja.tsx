import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import {
  PageWrapper,
  ContentHeader,
  ContentBody,
  ContentFooter,
  LogoSubText,
  Button,
} from "../utils/styled/components/components";
import { Logo } from "../utils/styled/components/Navbar";
import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";

const CustomPageWrapper = styled(PageWrapper)`
  max-width: ${({ theme }) => theme.pageMaxWidth};
  margin-left: auto;
  margin-right: auto;
`;

const CustomContentHeader = styled(ContentHeader)`
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 2rem 0;
`;

const ExtendedLogoWrapper = styled.div`
  text-align: center;
`;

const StyledForm = styled.form`
  &&& {
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: 700px;
    margin: 3rem auto 0 auto;

    label {
      color: ${({ theme }) => theme.colors.grey600};
      font-weight: 500;
    }

    input {
      background: ${({ theme }) => theme.colors.dark800};
      border-color: ${({ theme }) => theme.colors.dark800};
      color: ${({ theme }) => theme.colors.white500};

      ::placeholder {
        color: ${({ theme }) => theme.colors.grey700};
      }
    }
  }
`;

const rejestracja: React.FC = () => {
  const [recaptcha, setRecaptcha] = useState(false);

  const handleChange = (value) => {
    console.log(value);
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
          <StyledForm action="submit">
            <div className="field">
              <label className="label">Nazwa użytkownika</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input is-success"
                  type="text"
                  placeholder="Text input"
                  value="bulma"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-user"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-check"></i>
                </span>
              </div>
              <p className="help is-success">Nazwa jest dostępna</p>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input is-danger"
                  type="email"
                  placeholder="Twój adres email"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              </div>
              <p className="help is-danger">This email is invalid</p>
            </div>
            <div className="field">
              <label className="label">Hasło</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input is-danger"
                  type="email"
                  placeholder="Hasło do twojego konta"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              </div>
              <p className="help is-danger">This email is invalid</p>
            </div>
            <div className="field">
              <label className="label">Powtórz hasło</label>
              <div className="control has-icons-left has-icons-right">
                <input
                  className="input is-danger"
                  type="email"
                  placeholder="Powtórz hasło do konta"
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                <span className="icon is-small is-right">
                  <i className="fas fa-exclamation-triangle"></i>
                </span>
              </div>
              <p className="help is-danger">This email is invalid</p>
            </div>
            <ReCAPTCHA
              sitekey={process.env.RECAPTCHA_SITE_KEY}
              onChange={() => setRecaptcha(true)}
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
