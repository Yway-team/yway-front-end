import { gql } from "@apollo/client";

export const GET_NUMBERS = gql`
    query GetNumbers($_id: String!) {
        getNumbers(_id: $_id)
    }
`;
