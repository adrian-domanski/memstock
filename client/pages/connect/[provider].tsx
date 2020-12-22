import Link from "next/link";
import { SingletonRouter, withRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout/Layout";
import { AuthContext } from "../../context/authContext";
import {
  ContentBody,
  Button,
  StyledTitle,
} from "../../utils/styled/components/components";
import { PageWrapper } from "../../utils/styled/pages/connect/facebook/redirect";

interface IProps {
  router: SingletonRouter;
}

enum ErrorTypes {
  EMAIL_TAKEN,
  INVALID_TOKEN,
  OTHER,
  NONE,
}

const Redirect: React.FC<IProps> = ({ router }) => {
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState<ErrorTypes>(ErrorTypes.NONE);
  const params = router.query;

  useEffect(() => {
    if (params.access_token) {
      fetch(
        `${process.env.SERVER_URL}/auth/${params.provider}/callback?access_token=${params.access_token}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.user && data?.jwt) {
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: {
                user: data.user,
                token: data.jwt,
              },
            });
            router.push("/");
          } else {
            if (
              data?.message[0]?.messages[0]?.id ===
              "Auth.form.error.email.taken"
            ) {
              setError(ErrorTypes.EMAIL_TAKEN);
            } else if (
              data?.message?.error?.message === "Invalid OAuth access token."
            ) {
              setError(ErrorTypes.INVALID_TOKEN);
            } else {
              setError(ErrorTypes.OTHER);
            }
          }
        });
    }
  }, []);

  return (
    <Layout popularMems topUsers>
      <ContentBody className="py-6">
        <PageWrapper>
          {error === ErrorTypes.NONE ? (
            <>
              <StyledTitle className="has-text-centered my-3 px-4">
                Zalogowano pomyślnie, za chwilę nastąpi przekierowanie...
              </StyledTitle>
              <Link href="/">
                <Button className="is-primary light mt-5">Strona główna</Button>
              </Link>
            </>
          ) : error === ErrorTypes.EMAIL_TAKEN ? (
            <>
              <StyledTitle className="has-text-centered has-text-danger my-3 px-4">
                Nie udało się połączyć kont. Konto o takim adresie email
                istnieje już w naszym serwisie i jest stworzone za pomocą
                standardowej metody rejestracji. Zaloguj się za pomocą
                poniższego odnośnika.
              </StyledTitle>
              <Link href="/logowanie">
                <Button className="is-primary mt-5">Zaloguj się</Button>
              </Link>
              <Link href="/">
                <Button className="is-primary light mt-5">Strona główna</Button>
              </Link>
            </>
          ) : error === ErrorTypes.INVALID_TOKEN ? (
            <>
              <StyledTitle className="has-text-centered has-text-danger my-3 px-4">
                Wystąpił błąd: Niepoprawny token uwierzytelniający.
              </StyledTitle>
              <Link href="/">
                <Button className="is-primary light mt-5">Strona główna</Button>
              </Link>
            </>
          ) : (
            <>
              <StyledTitle className="has-text-centered has-text-danger my-3 px-4">
                Wystąpił nieoczekiwany błąd, przepraszamy na utrudniena.
              </StyledTitle>
              <Link href="/">
                <Button className="is-primary light mt-5">Strona główna</Button>
              </Link>
            </>
          )}
        </PageWrapper>
      </ContentBody>
    </Layout>
  );
};

export default withRouter(Redirect);
