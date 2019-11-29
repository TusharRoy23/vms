import client from '@client/utils/axios';

export const SET_AUTH = 'SET_AUTH';
export const UNSET_AUTH = 'UNSET_AUTH';

export const POST_LOGIN = 'POST_LOGIN';
export const POST_REGISTER = 'POST_REGISTER';
export const POST_LOGOUT = 'POST_LOGOUT';
export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_DETAILS = 'GET_USER_DETAILS';
export const GET_FOLDER_PATH = 'GET_FOLDER_PATH';

export default {
    [POST_LOGIN]: (context, data) => client.post('auth/login', data),
    [POST_REGISTER]: (context, data) => client.post('auth/register', data),
    [POST_LOGOUT]: (context, data) => client.post('auth/authLogout', data),
    [GET_USER_INFO]: (context) => client.get('auth/getUserInfo'),
    [GET_USER_DETAILS]: (context, data) => client.post('auth/getUserDetails', data),
    [GET_FOLDER_PATH]: (context) => client.get('auth/getFolderPath')
};