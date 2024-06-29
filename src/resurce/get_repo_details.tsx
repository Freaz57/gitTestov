import {gql} from "@apollo/client";

export const GET_REPO_DETAILS = gql`
  query getRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      stargazers {
        totalCount
      }
      updatedAt
      owner {
        login
        avatarUrl
        url
      }
      languages(first: 10) {
        nodes {
          name
        }
      }
      description
    }
  }
`;