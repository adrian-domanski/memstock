import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "./authContext";
import HomePage from "../pages/index";
import { isServer } from "../utils/helpers";

const AuthPages: React.FC<{ children: any }> = ({ children }) => {
  const { ctx } = useContext(AuthContext);
  const router = useRouter();
  const pathname = router.pathname;

  // Block all /cms/ routes
  if (
    !isServer() &&
    pathname.includes("/cms/") &&
    ctx?.user?.role?.name !== "PageAdmin"
  ) {
    router.push("/");
    return <HomePage />;
  }

  return children;
};

export default AuthPages;
