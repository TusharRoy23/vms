import Vue from 'vue';
import Router from 'vue-router';

import Login from '@pages/common/Login.vue';
import Dashboard from '@pages/dashboard/Dashboard.vue';

import DefaultContainer from '@pages/DefaultContainer.vue';
import Profile from '@pages/settings/Profile.vue';

import Item from '@pages/item/Item.vue';
import Category from '@pages/category/Category.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            component: Login
        },
        {
            path: '/',
            redirect: '/dashboard', // this will search in children
            name: 'Home',
            component: DefaultContainer,
            children: [
                {
                    path: 'dashboard', // need to match with parent **redirect** path
                    name: 'Dashboard',
                    component: Dashboard
                },
                {
                    path: 'profile-settings',
                    name: 'Profile Settings',
                    component: Profile
                },
                {
                    path: 'settings',
                    redirect: '',
                    name: 'Settings',
                    component: {
                        render (c) { return c('router-view'); }
                    },
                    children: [
                        {
                            path: 'user-settings',
                            name: 'user list',
                            component: Item
                        },
                        {
                            path: 'item-list',
                            name: 'Item List',
                            component: Item
                        },
                        {
                            path: 'vehicle-category',
                            name: 'Vehicle Category',
                            component: Category
                        }
                    ]
                }
            ]
        }
    ]
});