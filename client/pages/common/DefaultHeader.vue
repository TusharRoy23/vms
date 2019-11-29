<template>
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="images/logo.png" width="120" height="100" alt="CoreUI Logo">
        <img class="navbar-brand-minimized" src="images/logo.png" width="30" height="30" alt="CoreUI Logo">
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen=true />
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>
        <b-nav-item class="px-3" to="/users" exact>Users</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
</template>
<script>
import { Header as AppHeader, SidebarToggler, AsideToggler } from '@coreui/vue'
import DefaultHeaderDropdownAccnt from '@common/DefaultHeaderDropdownAccnt.vue'

export default {
  name: 'DefaultHeader',
  components: {
    AsideToggler,
    AppHeader,
    DefaultHeaderDropdownAccnt,
    SidebarToggler
  }
}
</script>
