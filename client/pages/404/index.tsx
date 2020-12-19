import React from "react";
import Layout from "../../components/layout/Layout/Layout";
import Link from "next/link";
import { Button, ContentBody } from "../../utils/styled/components/components";
import { Styled404Page } from "./styled";

const Custom404 = () => {
  return (
    <Layout>
      <ContentBody>
        <Styled404Page>
          <i className="fas fa-exclamation-triangle"></i>
          <h1 className="is-size-4 has-text-link">
            Niestety ta strona nie istnieje
          </h1>
          <Link href="/">
            <Button className="is-primary">Strona główna</Button>
          </Link>
        </Styled404Page>
      </ContentBody>
    </Layout>
  );
};

export default Custom404;
