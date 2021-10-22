import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation Login($idToken: String!) {
        login(idToken: $idToken) {
            _id
            googleId
            numbers
        }
    }
`;

export const LOGOUT = gql`
    mutation Logout($_id: String!) {
        logout(_id: $_id)
    }
`;

export const INCREMENT_NUMBER = gql`
    mutation IncrementNumber($_id: String!, $index: Int!) {
        incrementNumber(_id: $_id, index: $index)
    }
`;

export const DECREMENT_NUMBER = gql`
    mutation DecrementNumber($_id: String!, $index: Int!) {
        decrementNumber(_id: $_id, index: $index)
    }
`;

export const APPEND_NUMBER = gql`
    mutation AppendNumber($_id: String!) {
        appendNumber(_id: $_id)
    }
`;

export const DELETE_NUMBER = gql`
    mutation DeleteNumber($_id: String, $index: Int!) {
        deleteNumber(_id: $_id, index: $index)
    }
`;
