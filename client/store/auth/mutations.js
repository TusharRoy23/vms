import { SET_AUTH, UNSET_AUTH } from './actions';
export const USER_DETAILS = 'USER_DETAILS';
export const FOLDER_PATH = 'FOLDER_PATH';

export default {
    [SET_AUTH](state, {user, token}) {
        state.user = user;
        state.token = token;
    },
    [UNSET_AUTH](state) {
        state.user = null;
        state.token = null;
    },
    [USER_DETAILS](state, details) {
        state.userDetails = details.user;
    },
    [FOLDER_PATH](state, fPath) {
        state.fPath = fPath;
    }
};