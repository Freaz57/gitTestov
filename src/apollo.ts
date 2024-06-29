
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const TOKEN = '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'
const client = new ApolloClient({
    link: new HttpLink({
        uri: 'https://api.github.com/graphql',
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        }
    }),
    cache: new InMemoryCache()
});

export default client;
