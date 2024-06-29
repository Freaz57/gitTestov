import {gql} from "@apollo/client";

export const GET_USER_REPOS = gql`
  query getUserRepositories($first: Int!, $after: String) {
    viewer {
      repositories(first: $first, after: $after) {
        edges {
          node {
            name
            owner {
              login
            }
            stargazers {
              totalCount
            }
            updatedAt
            url
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;