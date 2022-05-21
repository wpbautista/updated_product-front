<template>
    <div v-if="currentProduct">
        <div class="mb-3">
            <label for="name" class="form-label">Product Name</label>
            <input type="text" class="form-control" id="name" required name="name" v-model="currentProduct.name">
        </div> 
        <div class="mb-3">
            <label for="description" class="form-label">Product Description</label>
            <input type="text" class="form-control" id="description" required name="description" v-model="currentProduct.description">
        </div>
        <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" class="form-control" id="price" required name="price" v-model="currentProduct.price">
        </div>
        <div class="mb-3">
            <label for="image" class="form-label">Picture</label>
            <input type="file" class="form-control" id="file" required name="file" @change="onChange" accept="image/*">
            <p class="form-label">Image Preview</p>
            <img :src="currentProduct.image" class="img-thumbnail" id="imgfile">
        </div>
        <div class="mb-3">
            <button @click="updateProduct" class="btn btn-primary me-3">Update</button>
            <button @click="deleteProduct" class="btn btn-danger">Delete</button>
        </div>
        <div class="alert alert-success" role="alert" v-if="message">
            {{message}}
        </div>
    </div>
</template>

<script>
import ProductDataService from "@/services/ProductDataService";

export default{
    name: 'edit-product',
    data(){
        return{
            currentProduct: null,
            message: ''
        }
    },
    methods:{
        getProduct(id){
            ProductDataService.get(id)
                .then(response => {
                    this.currentProduct = response.data
                })
                .catch(e => {
                    alert(e)
                })
        },
        updateProduct(){
            ProductDataService.update(this.currentProduct.id, this.currentProduct)
                .then(() => {
                    this.message = 'The product was updated successfully!'
                })
                .catch(e => {
                    alert(e)
                })
        },
        deleteProduct(){
            ProductDataService.delete(this.currentProduct.id)
                .then(() => {
                    this.$router.push({name: 'products'})
                })
                .catch(e => {
                    alert(e)
                })
        },
        onChange(e){
            var files = e.target.files || e.dataTransfer.files;
            if(!files.length) return;
            this.createImage(files[0]);
        },
        createImage(file){
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.product.image = e.target.result;
            };

            reader.readAsDataURL(file)
        }
    },
    mounted(){
        this.getProduct(this.$route.params.id)
    }
}
</script>

<style scoped>
#imgfile{
    height: 200px;
    width: 200px;
}
</style>