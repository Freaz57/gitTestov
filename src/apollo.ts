
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
