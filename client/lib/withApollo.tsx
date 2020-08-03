import withApollo from "next-with-apollo";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import cookie from "next-cookies";
import { getCookie, isServer } from "../utils/helpers";
import { setContext } from "apollo-link-context";
import { createUploadLink } from "apollo-upload-client";

const dev = process.env.NODE_ENV !== "production";

export default withApollo(
  ({ initialState, ctx }) => {
    const httpLink = createUploadLink({
      uri: dev
        ? "http://localhost:1337/graphql"
        : "http://localhost:1337/graphql",
    });

    const authLink = setContext((_, { headers }) => {
      let token = isServer() ? cookie(ctx).token : getCookie("token");

      return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : "",
        },
      };
    });

    return new ApolloClient({
      cache: new InMemoryCache().restore(initialState || {}),
      link: authLink.concat(httpLink),
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
