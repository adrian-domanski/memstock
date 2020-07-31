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

const Logowanie: React.FC = () => {
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
              Witaj ponownie przywoływaczu
            </LogoSubText>
          </ExtendedLogoWrapper>
        </CustomContentHeader>
        <ContentBody>
          <StyledForm action="submit">
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

            <Button className="is-primary light margin-auto mb-5 mt-3 px-6">
              Zaloguj
            </Button>
          </StyledForm>
        </ContentBody>
        <ContentFooter className="has-text-centered">
          Nie masz jeszcze konta?{" "}
          <Link href="/rejestracja">
            <a className="has-text-primary has-text-weight-bold">
              Zarejestruj się
            </a>
          </Link>
        </ContentFooter>
      </CustomPageWrapper>
    </Layout>
  );
};

export default Logowanie;
