import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import profile from './profile';
// import category from './category';
// import subcategory from './subcategory';
// import furcategory from './furcategory';
// import brand from './brand';
// import product from './product';
// import slider from './slider';
// import page from './page';
// import user from './user';


Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        profile,
        // category,
        // subcategory,
        // furcategory,
        // brand,
        // product,
        // slider,
        // page,
        // user
    }
});