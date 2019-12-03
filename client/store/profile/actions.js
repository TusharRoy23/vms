import client from '@client/utils/axios';

export const POST_USER_UPDATE = 'POST_USER_UPDATE';
export const POST_PROFILE_IMAGE = 'POST_PROFILE_IMAGE';
export const REMOVE_PROFILE_IMAGE = 'REMOVE_PROFILE_IMAGE';

export default {
    [POST_USER_UPDATE]: (context, data) => client.post('profile/updateProfile', data),
    [POST_PROFILE_IMAGE]: (context, data) => client.post('profile/profileImageUpdate', data),
    [REMOVE_PROFILE_IMAGE]: (context, data) => client.post('profile/removeProfileImage', data)
};