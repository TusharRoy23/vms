<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="6">
                <b-form @submit="updateUserProfile" enctype="multipart/form-data">
                    <b-card>
                        <div slot="header">
                            <strong>Profile </strong><small>Settings</small>
                        </div>
                        <b-form-group>
                            <label for="company">Full Name</label>
                            <!-- <b-form-input type="text" placeholder="Enter your full name" v-model="model.username"></b-form-input> -->
                            <form-input 
                                type="text"
                                :value="model.username"
                                name="username"
                                v-model="model.username"
                                v-validate="'required'"
                                placeholder="Enter your full name"
                                :error="errors.first('username')"
                            />
                        </b-form-group>
                        <b-form-group>
                            <label for="vat">E-mail</label>
                            <form-input 
                                type="email"
                                :value="model.email"
                                name="email"
                                v-model="model.email"
                                v-validate="'required'"
                                placeholder="example@mail.com"
                                :error="errors.first('email')"
                            />
                            <!-- <b-form-input type="text" placeholder="example@mail.com" v-model="model.email"></b-form-input> -->
                        </b-form-group>
                        <b-form-group>
                            <label for="street">Want To Change Password ?</label>
                            <b-form-input type="password" placeholder="Enter New Password"></b-form-input>
                        </b-form-group>
                        
                        <b-form-group>
                            <label for="country"></label>
                            <btn 
                                type="submit" 
                                size="lg" 
                                :variant="primary"
                                label="Update"
                                :disabled="loading"
                                :loading="loading"
                                class="px-4"
                            />
                        </b-form-group>
                        <b-alert :show="dismissCountDown"
                                dismissible
                                fade
                                @dismiss-count-down="countDownChanged"
                                :variant="varient">
                            Alert will dismiss after {{dismissCountDown}} seconds...
                        </b-alert>
                    </b-card>
                </b-form>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import formMixin from '@client/mixins/form';
import { GET_USER_INFO } from '@store/auth/actions';
import { POST_USER_UPDATE, POST_PROFILE_IMAGE } from '@store/profile/actions';

export default {
    name: 'Profile',
    mixins: [formMixin],
    data: () => {
        return {
            model: {
                username:'',
                email: '',
                userRole: ''
            },
            dismissSecs: 5,
            dismissCountDown: 0,
            varient: 'success'
        }
    },
    methods: {
        updateUserProfile (e) {
            e.preventDefault();
            this.$validator.validate().then(isValid => {
                if (!isValid) {
                    return
                }

                this.toggleLoading();
                this.$store.dispatch(POST_USER_UPDATE, this.model)
                .then((response) => {
                    
                    // if (this.model.imgFile) {
                    //     const formData = new FormData();
                    //     formData.append("profileImg", this.model.imgFile)
                        
                    //     this.$store.dispatch(POST_PROFILE_IMAGE, formData)
                    //     .then((response) => {
                            
                    //     })
                    //     .catch(error => {
                    //         console.log(error);
                    //     })
                    // }

                    this.toggleLoading()
                    this.dismissCountDown = this.dismissSecs
                    this.getUserDetails();
                })
                .catch(error => {
                    console.log(error);
                    this.varient = 'danger';
                })
            })
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        }
    },
    mounted() {
        this.$store.dispatch(GET_USER_INFO)
        .then((response) => {
            // this.setUserDetails(response.data); // send to auth mixin

            this.model.username = response.data.user.userName;
            this.model.email = response.data.user.userEmail;
            // this.model.status = response.data.user.status;
            this.model.userRole = response.data.user.userRole;
            // this.model.permission = JSON.parse(response.data.user.userPermission);

            // if (response.data.user.userPhoto) {
            //     this.imgUrl = 'uploads/' + response.data.user.userPhoto
            // } else {
            //     this.imgUrl = 'uploads/noImage.png';
            // }

            // this.setAuth(response.data)
        })
        .catch(error => {
            console.log('errors: ',error)
        })
    }
}
</script>