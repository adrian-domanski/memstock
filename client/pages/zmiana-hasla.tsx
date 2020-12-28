import { SingletonRouter, withRouter } from "next/router";
import Layout from "../components/layout/Layout/Layout";

interface IProps {
  router: SingletonRouter;
}

const ChangePasswordPage: React.FC<IProps> = ({ router }) => {
  console.log(router);
  return (
    <Layout>
      <h1>Change password page</h1>
    </Layout>
  );
};

export default withRouter(ChangePasswordPage);
