<template>
    <div class="app">
        <DefaultHeader/>
        <div class="app-body">
            <AppSidebar fixed>
                <SidebarHeader/>
                <SidebarForm/>
                <SidebarNav :navItems="nav"></SidebarNav>
                <SidebarFooter/>
                <SidebarMinimizer/>
            </AppSidebar>
            <main class="main">
                <Breadcrumb :list="list"/>
                <div class="container-fluid">
                <router-view></router-view>
                </div>
            </main>
            <AppAside fixed>
                <!--aside-->
                <DefaultAside/>
            </AppAside>
        </div>
        <DefaultFooter/>
    </div>
</template>
<script>
import nav from '@navbar'
import { Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, Breadcrumb } from '@coreui/vue'
import DefaultAside from '@common/DefaultAside.vue'
import DefaultHeader from '@common/DefaultHeader.vue'
import DefaultFooter from '@common/DefaultFooter.vue'
import DefaultHeaderDropdownAccnt from '@common/DefaultHeaderDropdownAccnt.vue'

export default {
    name: 'Home',
    components: {
        AppSidebar,
        AppAside,
        Breadcrumb,
        DefaultAside,
        DefaultHeaderDropdownAccnt,
        SidebarForm,
        SidebarFooter,
        SidebarHeader,
        SidebarNav,
        SidebarMinimizer,
        DefaultFooter,
        DefaultHeader
    },
    data () {
        return {
            nav: nav.items
        }
    },
    computed: {
        name () {
            return this.$route.name
        },
        list () {
            return this.$route.matched.filter((route) => route.name || route.meta.label )
        }
    },
    created() {
        console.log('Hello There');
    },
}
</script>