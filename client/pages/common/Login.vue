<template>
    <div class="animated fadeIn">
        <div class="app flex-row align-items-center">
            <div class="container">
                <b-row class="justify-content-center">
                    <b-col md="8">
                        <b-card-group>
                            <b-card no-body class="p-4">
                            <b-card-body>
                                <b-form @submit="submitTest">
                                    <h1>Login</h1>
                                    <p class="text-muted">Sign In to your account</p>
                                    <b-input-group class="mb-3">
                                        <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                                        <b-form-input type="text" class="form-control" v-model="model.username" v-validate="{required: true}" />
                                    </b-input-group>
                                    <span v-if="this.error.username" style="color:#ff7979">{{this.error.username}}</span>
                                    <b-input-group class="mb-4">
                                        <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                                        <b-form-input type="password" class="form-control" placeholder="Password" v-model="model.password" v-validate="{required: true}" />
                                    </b-input-group>
                                    <span v-if="this.error.password" style="color:#ff7979">{{this.error.password}}</span>
                                    <b-row>
                                        <b-col cols="6">
                                        <btn 
                                                type="submit" 
                                                size="md" 
                                                :variant="primary"
                                                label="Sign In"
                                                :disabled="loading"
                                                :loading="loading"
                                                class="px-4"
                                            />
                                        </b-col>
                                        <b-col cols="6" class="text-right">
                                        <b-button variant="link" class="px-0">Forgot password?</b-button>
                                        </b-col>
                                    </b-row>
                                </b-form>
                            </b-card-body>
                            </b-card>
                            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
                            <b-card-body class="text-center">
                                <div>
                                <h2>Sign up</h2>
                                
                                </div>
                            </b-card-body>
                            </b-card>
                        </b-card-group>
                    </b-col>
                </b-row>
            </div>
        </div>
    </div>
</template>
<script>
import formMixin from '@client/mixins/form';
import { POST_LOGIN, POST_LOGOUT, GET_USER_INFO } from '@store/auth/actions';

export default {
    name: 'Login',
    mixins: [formMixin],
    data() {
        return {
            model: {
                username:'',
                password:''
            },
            error: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        submitTest (e) {
            e.preventDefault();
            this.error.username = "";
            this.error.password = "";

            this.$validator.validate().then(isValid => {
                if (!isValid) {
                    if (!this.model.username) {
                        this.error.username = "Username Required !";
                    }
                    if (!this.model.password) {
                        this.error.password = "Password Required !";
                    }

                    return 
                }

                this.toggleLoading()
                this.$store.dispatch(POST_LOGIN, this.model)
                .then((response) => {
                    console.log(response)
                    this.toggleLoading()
                    this.setAuth(response.data)
                    this.$router.push('/dashboard');
                })
                .catch(error => {
                  this.toggleLoading()
                    Object.keys(error.response.data).forEach(field => {
                        this.errors.add({
                            field,
                            msg: error.response.data[field]
                        });
                    });
                });
            })
        }
    },
}
</script>