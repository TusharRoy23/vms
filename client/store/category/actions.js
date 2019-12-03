import client from '@client/utils/axios';

export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const CREATE_CATEGORY = 'CREATE_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const GET_CATEGORY_LIST = 'GET_CATEGORY_LIST';
export const UPDATE_STATUS   = 'UPDATE_STATUS'; 

export default {
    [UPDATE_CATEGORY]: (context, data) => client.post('category/updateCategory', data),
    [CREATE_CATEGORY]: (context, data) => client.post('category/createCategory', data),
    [DELETE_CATEGORY]: (context, data) => client.post('category/deleteCategory', data),
    [GET_CATEGORY_LIST]: (context, data) => client.get('category/getCategoryList'),
    [UPDATE_STATUS]: (context, data) => client.post('category/updateStatus', data)
};