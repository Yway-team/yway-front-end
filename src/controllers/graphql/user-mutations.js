import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation Login($idToken: String!) {
        login(idToken: $idToken) {
            _id
            accessToken
            avatar
            creatorPoints
            favorites {
                thumbnailImg
                title
            }
            googleId
            notifications {
                _id
                createdAt
                icon
                name
                type
                unread
            }
            playPoints
            username
        }
    }
`;

export const DELETE_DRAFT = gql`
    mutation DeleteDraft($draftId: ID!) {
        deleteDraft(draftId: $draftId)
    }
`;

export const UPDATE_PRIVACY_SETTINGS = gql`
    mutation UpdatePrivacySettings($privacySettings: String!) {
        # If privacy settings is not one of 'private', 'public', or 'friends', it does nothing and returns null. On success, returns the new privacy settings.
        updatePrivacySettings(privacySettings: $privacySettings)
    }
`;

export const UPDATE_USERNAME = gql`
    mutation UpdateUsername($username: String!) {
        updateUsername(username: $username){
            username
        }
    }
`;

export const UPDATE_BIO = gql`
    mutation UpdateBio($bio: String!) {
        updateBio(bio: $bio){
            bio
        }
    }
`;

export const FAVORITE_PLATFORM = gql`
    mutation FavoritePlatform($platformId: ID!) {
        favoritePlatform(platformId: $platformId) {
            thumbnailImg
            title
        }
    }
`;

export const UNFAVORITE_PLATFORM = gql`
    mutation UnfavoritePlatform($platformId: ID!) {
        unfavoritePlatform(platformId: $platformId) {
            thumbnailImg
            title
        }
    }
`;

export const INCREMENT_PLAY_POINTS = gql`
    mutation IncrementPlayPoints($playPointsIncrement: Int!) {
        incrementPlayPoints(playPointsIncrement: $playPointsIncrement)
    }
`;

export const EDIT_PROFILE = gql`
    mutation EditProfile($username: String!, $bio: String, $bannerImgData: String, $avatarData: String) {
        editProfile(username: $username, bio: $bio, bannerImgData: $bannerImgData, avatarData: $avatarData) {
            username
            bio
            avatar
        }
    }
`;

export const SEND_FRIEND_REQUEST = gql`
    mutation SendFriendRequest($receiverId: ID!) {
        sendFriendRequest(receiverId: $receiverId)
    }
`;

export const ADD_FRIEND = gql`
    mutation AddFriend($friendId: ID!) {
        addFriend(friendId: $friendId)
    }
`;

export const SET_READ_NOTIFICATIONS = gql`
    mutation SetReadNotifications($time: String!) {
        setReadNotifications(time: $time) {
            _id
            createdAt
            icon
            name
            type
            unread
        }
    }
`;
