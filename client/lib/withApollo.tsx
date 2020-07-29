import withApollo from "next-with-apollo";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
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
        ? "http://localhost:5000/graphql"
        : "http://api.dev.adrian-domanski.pl/graphql",
    });

    const authLink = setContext((_, { headers }) => {
      let token = "";

      if (isServer()) {
        token = cookie(ctx).token;
      } else {
        token = getCookie("token");
      }

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
