import Link from "next/link";
import { SingletonRouter, withRouter } from "next/router";
import React, { useContext, useEffect } from "react";
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
  const params = router.query;

  useEffect(() => {
    if (params.access_token) {
      fetch(
        `${process.env.SERVER_URL}/auth/facebook/callback?access_token=${params.access_token}`
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
    }
    router.push("/");
  }, []);

  return (
    <Layout popularMems topUsers>
      <ContentBody className="py-6">
        <PageWrapper>
          {params.access_token ? (
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
                Nie udało się zalogować, za chwilę nastąpi przekierowanie...
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
