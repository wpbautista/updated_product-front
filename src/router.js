import {createRouter, createWebHistory} from 'vue-router'


    const routes = [
        {
            path:'/',
            name: 'home-page',
            component: () => import('@/components/HomePage.vue')
        },
        {
            path:'/user',
            name: 'user-page',
            component: () => import('@/components/SellerDashboard.vue')

        },
        {
            path:'/login',
            name: 'login-page',
            component: () => import('@/components/Login.vue')
        },
        {
            path: '/products',
            name: 'products',
            component: () => import('@/components/ProductList.vue')
        },
        {
            path: '/products/:id',
            name: 'edit-product',
            component: () => import('@/components/EditProduct.vue')
        },
        {
            path: '/add',
            name: 'add-product',
            component: () => import('@/components/AddProduct.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () =>import('@/components/Register.vue')
        }
    ]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router