import Layout from "../components/layout/Layout/Layout";
import {
  ContentBody,
  Button,
  ContentHeader,
} from "../utils/styled/components/components";
import { Styled404Page } from "../utils/styled/pages/404";
import Link from "next/link";

const Custom404 = () => {
  return (
    <Layout popularMems topUsers>
      <ContentHeader />
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
      <ContentHeader />
    </Layout>
  );
};

export default Custom404;
