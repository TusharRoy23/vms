import { SET_AUTH, UNSET_AUTH, GET_USER_DETAILS, GET_FOLDER_PATH } from '@store/auth/actions';
import { USER_DETAILS, FOLDER_PATH } from '@store/auth/mutations';

export default {
    computed: {
        auth() {
            return !!this.$store.state.auth.user;
        },
        user() {
            return this.$store.state.auth.user;
        },
        confirmed() {
            return !!this.$store.state.auth.user.emailConfirmedAt;
        },
        getUserInfo() {
            return this.$store.state.auth.userDetails;
        },
        getFolderPath() {
            return this.$store.state.auth.fPath;
        }
    },
    methods: {
        setAuth(payload) {
            localStorage.setItem('auth', JSON.stringify(payload));
            this.$store.commit(SET_AUTH, payload); // SET IN store/auth/mutation.js 
            
        },
        unsetAuth() {
            console.log('hello mixins');
            localStorage.removeItem('auth');
            this.$store.commit(UNSET_AUTH); // SET IN store/auth/mutation.js 
            // this.flash('Successfully logged out.');
            this.$router.push('/');
        },
        getUserDetails(){
            const auth = localStorage.getItem('auth');
            this.$store.dispatch(GET_USER_DETAILS, {auth})
            .then(response => {
                if (response.data) {
                    this.$store.commit(USER_DETAILS, response.data); // Mutations
                }
                else{
                    this.$router.push('/');
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        checkLocalStore() {
            if (!localStorage.getItem('auth')) {
                this.$router.push('/');
                location.reload();
            }
        },
        setFolderPath(){
            this.$store.dispatch(GET_FOLDER_PATH)
            .then(response => {
                if (response.data) {
                    this.$store.commit(FOLDER_PATH, response.data); 
                }
            })
            .catch((error) => {
                console.log();
            });
        }
    }
};