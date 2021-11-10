import { gql } from '@apollo/client';

export const CREATE_PLATFORM = gql`
    mutation CreatePlatform($platform: PlatformInput!) {
        # input PlatformInput {
        #     bannerImg: String
        #     color: String
        #     description: String
        #     minCreatorPoints: Int
        #     onlyModSubmissions: Boolean
        #     thumbnailImg: String
        #     tags: [String]
        #     title: String!
        # }
        createPlatform(platform: $platform)
    }
`;
