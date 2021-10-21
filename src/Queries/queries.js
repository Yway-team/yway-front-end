import { gql } from "@apollo/client";

export const GET_NUMBER = gql`
    query GetNumber($_id: String!) {
        getNumber(_id: $_id)
    }
`;
