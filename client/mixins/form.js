export default {
    data: () => ({
        loading: false,
        primary: 'primary'
    }),
    methods: {
        toggleLoading() {
            this.loading = !this.loading;
        }
    },
};