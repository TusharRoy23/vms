<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="4">
                <b-form @submit="createCategory">
                    <b-card>
                        <div slot="header">
                            <strong>Category </strong><small>Settings</small>
                        </div>
                        <b-form-group>
                            <label for="company">Category Name</label>
                            <form-input 
                                type="text"
                                :value="model.categoryName"
                                name="categoryName"
                                v-model="model.categoryName"
                                v-validate="'required'"
                                placeholder="Enter Category name"
                                :error="errors.first('categoryName')"
                            />
                        </b-form-group>
                        <b-form-group>
                            <div class="form-row">
                                <div class="col-sm-2">
                                    Status :
                                </div>
                                <div class="col-sm-8 form-inline">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" v-model="model.status" checked>
                                        <label class="form-check-label" for="inlineRadio1">Active</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="0" v-model="model.status">
                                        <label class="form-check-label" for="inlineRadio2">In-Active</label>
                                    </div>
                                </div>
                            </div>
                        </b-form-group>
                        
                        <b-form-group>
                            <label for="country"></label>
                            <btn 
                                type="submit" 
                                size="lg" 
                                :variant="primary"
                                label="Create"
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
            <b-col sm="8">
                <b-card>
                    <table class="table table-responsive-sm">
                        <thead>
                            <tr>
                                <th class="text-center">SL No</th>
                                <th class="text-center">Name</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(category, index) in categoryList" :key="index">
                                <td class="text-center">{{index + 1}}</td>
                                <td class="text-center">
                                    <span :id="'name-'+category._id">
                                        {{category.categoryName}}
                                    </span>
                                    <span :id="'inputF-'+category._id" style="display:none">
                                        <input type="text" class="form-control" :id="'ref-'+category._id" :value="category.categoryName">
                                        <p :id="'msg-'+category._id" style="display: none; color: #ff7979">
                                            Value Required !
                                        </p>
                                    </span>
                                </td>
                                <td class="text-center">
                                    <b-col sm xs="12" class="text-center mt-3">
                                        <b-button variant="primary" class="btn-pill" @click="edit(category._id)" :id="'edit-'+category._id">
                                            <i class="fa fa-pencil"></i>                                   
                                        </b-button>
                                        <b-button variant="success" style="display:none" class="btn-pill" @click="save(category._id)" :id="'save-'+category._id">
                                            <i class="fa fa-check"></i>                                   
                                        </b-button>
                                        <b-button variant="danger" style="display:none" class="btn-pill" @click="editClose(category._id)" :id="'close-'+category._id">
                                            <i class="fa fa-close"></i>                                   
                                        </b-button>
                                        
                                        <b-button variant="success" class="btn-pill" @click="publish(category._id, category.status)">
                                            <i class="fa fa-lock" v-if="category.status"></i>
                                            <i class="fa fa-unlock" v-else></i>
                                        </b-button>
                                        <b-button variant="danger" class="btn-pill" @click="deleteCategory(category._id)">
                                            <i class="fa fa-trash"></i>
                                        </b-button>
                                    </b-col>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
import formMixin from '@client/mixins/form';
import { UPDATE_CATEGORY, CREATE_CATEGORY, DELETE_CATEGORY, UPDATE_STATUS } from '@store/category/actions';

export default {
    name: 'Category',
    mixins: [formMixin],
    data() {
        return {
            model: {
                categoryName: '',
                status: 1
            },
            dismissSecs: 5,
            dismissCountDown: 0,
            varient: 'success',
            editMode: {}
        }
    },
    methods: {
        createCategory (e) {
            e.preventDefault();
            console.log(this.model);
            this.$validator.validate().then(isValid => {
                if (!isValid) {
                    return 
                }
                this.toggleLoading()
                this.$store.dispatch(CREATE_CATEGORY, this.model)
                .then((response) => {
                    if (response.data) {
                        this.getCategoryList();
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
                this.toggleLoading()
            })
        },
        edit(id) {
            this.$nextTick(function() {
                document.getElementById('name-'+id).style.display = document.getElementById('edit-'+id).style.display ="none";
                document.getElementById('inputF-'+id).style.display = document.getElementById('close-'+id).style.display = document.getElementById('save-'+id).style.display = "inline";
                document.getElementById('ref-'+id).focus();
            }.bind(this))
        },
        editClose (id){
            this.$nextTick(function() {
                document.getElementById('close-'+id).style.display = document.getElementById('save-'+id).style.display = document.getElementById('inputF-'+id).style.display = "none";
                document.getElementById('name-'+id).style.display = document.getElementById('edit-'+id).style.display = "inline";
            }.bind(this));
        },
        save (id) {
            var categoryName = document.getElementById('ref-'+id).value;
            if (categoryName) {
                this.toggleLoading()
                this.$store.dispatch(UPDATE_CATEGORY, {categoryName, id})
                .then((response) => {
                    
                    if (response.data) {
                        this.getCategoryList();
                        this.editClose(id);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
                this.toggleLoading();
            }
            else{
                document.getElementById('msg-'+id).style.display = "inline";
            }
        },
        publish(id, status) {
            this.$store.dispatch(UPDATE_STATUS, {id, status})
            .then((response) => {
                this.getCategoryList();
            })
            .catch(error => {
                console.log(error);
            })
        },
        deleteCategory (id) {
            this.$store.dispatch(DELETE_CATEGORY, {id:id})
            .then((response) => {
                this.getCategoryList();
            })
            .catch(error => {
                console.log(error)
            })
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
    },
    mounted() {
        this.getUserDetails();
        this.getCategoryList();
    },
}
</script>