import React from "react";
import Layout from "../components/layout/Layout";
import styled from "styled-components";
import Link from "next/link";
import { Button } from "../utils/styled/components/components";

const Styled404Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 60vh;

  h1 {
    font-weight: bold;
  }

  i {
    font-size: 5rem;
    margin-bottom: 1rem;
    color: ${({ theme }) => theme.colors.primaryDarker};
  }
`;

const Custom404 = () => {
  return (
    <Layout>
      <Styled404Page>
        <i className="fas fa-exclamation-triangle"></i>
        <h1 className="is-size-4 mb-5 has-text-link">
          Niestety ta strona nie istnieje
        </h1>
        <Link href="/">
          <Button className="is-primary">Strona główna</Button>
        </Link>
      </Styled404Page>
    </Layout>
  );
};

export default Custom404;
