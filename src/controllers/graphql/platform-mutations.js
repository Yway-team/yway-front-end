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

export const UPDATE_PLATFORM_SETTINGS = gql`
    mutation UpdatePlatformSettings($platformSettings: PlatformSettingsInput!) {
        updatePlatformSettings(platformSettings: $platformSettings) {
            bannerImg
            color
            description
            minCreatorPoints
            onlyModSubmissions
            tags
            thumbnailImg
            title
            _id
        }
    }
`;
