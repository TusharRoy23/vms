import { GET_CATEGORY_LIST } from '@store/category/actions';
import { CATEGORY_LIST } from '@store/category/mutations';

export default {
    computed: {
        categoryList () {
            return this.$store.state.category.categoryList;
        }
    },
    methods: {
        getCategoryList () {
            this.$store.dispatch(GET_CATEGORY_LIST)
            .then((response) => {
                if (response.data) {
                    this.$store.commit(CATEGORY_LIST, response.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    },
};