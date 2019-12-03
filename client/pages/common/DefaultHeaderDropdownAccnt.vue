<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">

      <img
        v-if="getUserInfo.userPhoto"
        :src="'images/'+getUserInfo.userPhoto"
        class="img-avatar"
        :alt="getUserInfo.userName" />

      <img
        v-else
        :src="'images/noImage.jpg'"
        class="img-avatar"
        :alt="getUserInfo.userName" />
    </template>
    <template slot="dropdown">
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Settings</strong>
      </b-dropdown-header>
      <b-dropdown-item><router-link to="/profile-settings" style="text-decoration: none"><i class="fa fa-user" /> Profile</router-link></b-dropdown-item>
      <b-dropdown-divider />
      <b-dropdown-item><i class="fa fa-shield" /> Lock Account</b-dropdown-item>
      <b-dropdown-item @click="logout"><i class="fa fa-lock" /> Logout</b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { GET_USER_INFO } from '@store/auth/actions'
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { 
      itemsCount: 42 
    }
  },
  methods: {
    logout () {
      this.unsetAuth()
    }
  },
  mounted() {
    this.getUserDetails();
  },
}
</script>
