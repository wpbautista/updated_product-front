<template>
<div id="app">
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">Online Shop</router-link>
      <div class="collapse navbar-collapse">
        <div class="navbar-nav">
          <!--change to back to buyer-->
          <router-link to="/login" class="nav-link">Login</router-link>
          <router-link to="/register" class="nav-link">Register</router-link>
          <router-link to="/products" class="nav-link">Product List</router-link>
          <router-link to="/add" class="nav-link">Add New Product</router-link>
        </div>
      </div>
    </div>
  </nav>
  <div class="container">
    <router-view />
  </div>
</div>
</template>

<script>


export default {
  name: 'App',
  data(){
      return{
        userState :{
        username: '',
        //userId: null,
        isLoggedIn: 'false'
      }
    }
  },
  
  mounted(){
    if(localStorage.getItem('isLoggedIn') == 'true')
      this.userState.username = this.$session.get('username')
    else
      this.userState.username = "Anon"
  },
  created(){
    localStorage.setItem('isLoggedIn',  'false')
  }
}
</script>

<style>

</style>
