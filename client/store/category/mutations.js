export const CATEGORY_LIST = 'CATEGORY_LIST';
export default {
    [CATEGORY_LIST](state, category){
        state.categoryList = category;
    }
};