import { gql } from '@apollo/client';

export const GET_PLATFORM_HIGHLIGHTS = gql`
    query GetPlatformHighlights($howMany: Int!) {
        getPlatformHighlights(howMany: $howMany) {
            _id
            description
            favorites
            numQuizzes
            thumbnailImg
            title
        }
    }
`;
