<template>
<div>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Product Name</th>
                <th scope="col">Product Description</th>
                <th scope="col">Product Price</th>
                <th scope="col">Preview Image</th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody v-for="(product, index) in products" :key="index">
            <tr>
                <td>{{product.name}}</td>
                <td>{{product.description}}</td>
                <td>{{product.price}}</td>
                <td><img :src="product.image" class="img-thumbnail" style="height:50px;width:50px"></td>
                <td><a :href="'/products/' + product.id" class="btn btn-primary">Edit</a></td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
import ProductDataService from "@/services/ProductDataService";

export default{
    name: 'products-list',
    data(){
        return{
            products: []
        }
    },
    methods:{
        retrieveProducts(){
            ProductDataService.getAll()
                .then(response => {
                    this.products = response.data
                })
                .catch(e => {
                    alert(e)
                })
        }
    },
    mounted(){
        this.retrieveProducts()
    }
}
</script>