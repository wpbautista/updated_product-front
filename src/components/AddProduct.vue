<template>
<div>
    <div v-if="!submitted">
        <div class="mb-3">
            <label for="name" class="form-label">Product Name</label>
            <input type="text" class="form-control" id="name" required name="name" v-model="product.name">
        </div>
        <div class="mb-3">
            <label for="description" class="form-label">Product Description</label>
            <input type="text" class="form-control" id="description" required name="description" v-model="product.description">
        </div>
        <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" class="form-control" id="price" required name="price" v-model="product.price">
        </div>
        <div class="mb-3">
            <label for="image" class="form-label">Picture</label>
            <input type="file" class="form-control" id="file" required name="file" @change="onChange" accept="image/*">
            <p class="form-label">Image Preview</p>
            <img :src="product.image" class="img-thumbnail" id="imgfile">
        </div>
        <div class="mb-3">
            <button @click="saveProduct" class="btn btn-primary">Submit</button>
        </div>
    </div>
    <div v-else>
        <div class="alert alert-success" role="alert">
            Product saved successfully!
        </div>
        <button @click="newProduct" class="btn btn-primary">Add New Product</button>
    </div>
</div>
</template>

<script>
import ProductDataService from "@/services/ProductDataService";

export default{
    name: 'add-product',
    data(){
        return{
            product:{
                id: null,
                name: "",
                description: "",
                price: null,
                image: ""
            },
            submitted: false
        }
    },
    methods:{
        saveProduct(){
            var data={
                name: this.product.name,
                description: this.product.description,
                price: this.product.price,
                image: this.product.image
            }
            ProductDataService.create(data)
                .then(response => {
                    this.product.id = response.data.id
                    this.submitted = true;
                })
                .catch( e => {
                    alert(e)
                })
        },
        newProduct(){
            this.submitted = false
            this.product = {}
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
    }
}
</script>

<style scoped>
#imgfile{
    height: 200px;
    width: 200px;
}
</style>