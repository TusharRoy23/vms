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
                        </b-form-group>
                        <b-form-group>
                            <div class="upload-btn-wrapper ">
                                <label for="street">Profile Image</label>
                                <div v-if="imgUrl" >
                                    <span class="remove-file" @click="removeFile()"><img src="delete.png" height="30" width="30"></span>
                                </div>
                                <input type="file" name="myfile" @change="onFileChange" ref="fileInput" />
                                <div v-if="imgUrl" >
                                    <button class="btn"><img v-if="imgUrl" :src="imgUrl" height="200" width="200" /></button>
                                </div>
                                <div v-else>
                                    <button class="btn"><img src="addmore.png" height="200" width="200"></button>
                                </div>
                            </div>
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
import { POST_USER_UPDATE, POST_PROFILE_IMAGE, REMOVE_PROFILE_IMAGE } from '@store/profile/actions';

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
            imgFile: '',
            fileName: '',
            imgUrl: '',
            existImg: '',
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
                    
                    if (this.imgFile) {
                        const formData = new FormData();
                        formData.append("profileImg", this.imgFile)
                        
                        this.$store.dispatch(POST_PROFILE_IMAGE, formData)
                        .then((response) => {
                        })
                        .catch(error => {
                            console.log(error);
                        })
                    }

                    if (!this.existImg) {
                        this.$store.dispatch(REMOVE_PROFILE_IMAGE, {file: this.fileName})
                        .then((response) => {
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    }

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
        },
        onFileChange(e){
            const file = e.target.files[0]
            this.imgUrl = URL.createObjectURL(file)
            this.imgFile = e.target.files[0]
        },
        removeFile(){
            this.imgFile = '';
            this.existImg = '';

            var txt = 'fileInput';
            const input = this.$refs[txt]
            input.type = 'text';
            input.type = 'file';
            
            var lxt = 'imgUrl';
            this[lxt] = '';
        },
    },
    mounted() {
        this.$store.dispatch(GET_USER_INFO)
        .then((response) => {
            this.model.username = response.data.user.userName;
            this.model.email = response.data.user.userEmail;
            // this.model.status = response.data.user.status;
            this.model.userRole = response.data.user.userRole;
            // this.model.permission = JSON.parse(response.data.user.userPermission);
            if (response.data.user.userPhoto) {
                this.imgUrl = 'images/' + response.data.user.userPhoto
                this.existImg = response.data.user.userPhoto
                this.fileName = response.data.user.userPhoto
            }
        })
        .catch(error => {
            console.log('errors: ',error)
        })
    }
}
</script>
<style lang="scss" scoped>
    .remove-file{
        cursor: pointer;
        position: absolute;
        left: 195px;
        z-index: 1
    }

    .upload-btn-wrapper {
        position: relative;
        overflow: hidden;
        display: inline-block;
    }

    .upload-btn-wrapper input[type=file] {
        font-size: 100px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }
</style>