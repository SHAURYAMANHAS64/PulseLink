import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Backend URL (dev)
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql', // ← This connects React to your backend
});

// (Optional) Auth headers – Not needed now
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers
    }
  };
});

// Create the Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
