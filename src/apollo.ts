
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
