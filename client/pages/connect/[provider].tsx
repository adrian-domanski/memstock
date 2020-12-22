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

const Redirect: React.FC<IProps> = ({ router }) => {
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const params = router.query;

  useEffect(() => {
    if (params.access_token) {
      try {
        fetch(
          `${process.env.SERVER_URL}/auth/${params.provider}/callback?access_token=${params.access_token}`
        )
          .then((res) => res.json())
          .then((data) => {
            dispatch({
              type: "LOGIN_SUCCESS",
              payload: {
                user: data.user,
                token: data.jwt,
              },
            });
          });
        router.push("/");
      } catch (err) {
        console.log(err);
        console.log({ ...err });
        // Account with such email was created using standard registration method
        setError(true);
      }
    }
  }, []);

  return (
    <Layout popularMems topUsers>
      <ContentBody className="py-6">
        <PageWrapper>
          {!error ? (
            <>
              <StyledTitle className="has-text-centered my-3 px-4">
                Zalogowano pomyślnie, za chwilę nastąpi przekierowanie...
              </StyledTitle>
              <Link href="/">
                <Button className="is-primary light mt-5">Strona główna</Button>
              </Link>
            </>
          ) : (
            <>
              <StyledTitle className="has-text-centered my-3 px-4">
                Nie udało się zalogować. Konto o takim adresie email istnieje
                już w naszym serwisie i jest stworzone za pomocą standardowej
                metody rejestracji.
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
