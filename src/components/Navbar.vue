<template>
    <nav class="nav">
        <div class="container">
            <div class="nav__box">
                <ul class="nav__box-list">
                   <router-link 
                   v-for="link in links"
                   :key="link.name"
                   :to="link.url"
                   class="nav__box-list-link"
                   >{{ link.name }}</router-link>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { productsStore } from '../stores/products';

// const store = productsStore()
// const products = computed(() => store.products)
// store.getProducts()

// const sortedCategories = ref([]);

// watch(products, (newProducts) => {
//     if (newProducts) {
//         sortedCategories.value = [...new Set(newProducts.map(obj => obj.category))].sort();
//         console.log(sortedCategories.value);
//     }
// });

const links = ref([
    { url: '/', name: 'Home' },
    { url: '/products', name: 'Products' }
])

</script>
