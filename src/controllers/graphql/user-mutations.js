import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($idToken: String!) {
        login(idToken: $idToken) {
            _id
            accessToken
            avatar
            creatorPoints
            favorites
            googleId
            notifications {
              description
              type
              timestamp
            }
            playPoints
            username
        }
    }
`;

export const UPDATE_PRIVACY_SETTINGS = gql`
    mutation UpdatePrivacySettings($privacySettings: String!) {
        # If privacy settings is not one of 'private', 'public', or 'friends', it does nothing and returns null. On success, returns the new privacy settings.
        updatePrivacySettings(privacySettings: $privacySettings)
    }
`;

export const FAVORITE_PLATFORM = gql`
    mutation FavoritePlatform($platformId: ID!) {
        favoritePlatform(platformId: $platformId)
    }
`;

export const UNFAVORITE_PLATFORM = gql`
    mutation UnfavoritePlatform($platformId: ID!) {
        unfavoritePlatform(platformId: $platformId)
    }
`;
