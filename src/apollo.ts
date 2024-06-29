
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
