<template>
    <div class="products">
        <div class="container">
            <div class="top"></div>
            <h2 class="products__sort-title">Товары</h2>
            <div class="products__sort">
                <div class="products__sort-box">
                    <span>Сортировка</span>
                    <select v-model="sortType" class="products__sort-box-select">
                        <option class="option" value="Название">Название</option>
                        <option class="option" value="Цена">Цена</option>
                        <option class="option" value="Кол-во">Кол-во</option>
                    </select>
                </div>
                <div class="products__sort-searchBox">
                    <span>Поиск</span>
                    <input 
                    type="text" 
                    class="products__sort-searchBox-search"
                    placeholder="Поиск"
                    v-model="search"
                    >
                </div>
            </div>
            <div class="products__box" v-if="products">
                <div class="products__box-item"
                v-for="prod in sortedProducts"
                :key="prod.id"
                >
                <router-link :to="`/products/${prod.id}`">
                <img :src="prod.thumbnail" alt="" class="products__box-item-img">
                </router-link>
                
                <span class="products__box-item-discount">-{{ Math.round(prod.discountPercentage) }}%</span>
                <div class="products__box-item-text">
                    <h3 class="products__box-item-text-title">{{ prod.title }}</h3>
                    <p class="products__box-item-text-description">{{ prod.brand }}</p>
                    <p class="products__box-item-text-stock">Кол-во: {{ prod.stock }}</p>
                    <p class="products__box-item-text-price">Цена: {{ prod.price }}$</p>
                    <p class="products__box-item-text-discountPrice">Цена: {{ prod.price - (Math.round(prod.price * (Math.round(prod.discountPercentage) / 100))) }}$</p>
                    <router-link :to="`/products/${prod.id}`" class="products__box-item-text-btn">Подробнее</router-link>
                </div>
                </div>
            </div>
            <Loader v-else/>
            <div class="products__pagination">
                <button class="products__pagination-btn" @click="prevPage()" :disabled="currentPage === 1">Назад</button>
                <ul class="products__pagination-list" v-if="totalPages">
                    <li 
                    v-for="page in totalPages" 
                    :key="page" 
                    @click="goToPage(page)"
                    class="products__pagination-list-link"
                    :class="{ active: currentPage == page }"
                    >
                    {{ page }}
                    </li>
                </ul>
                <button class="products__pagination-btn" @click="nextPage()" :disabled="currentPage === totalPages">Вперед</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { productsStore } from '@/stores/products.js'
import _debounce from 'lodash/debounce';

const store = productsStore()
store.getProducts()
const products = computed(() => store.products)

const productsPerPage = ref(12)
const currentPage = ref(1)
const search = ref('')

const totalPages = computed(() => Math.ceil(products.value?.length / productsPerPage.value))
const applyFilter = ref(false)
const displayedProducts = computed(() => {
    const startIndex = (currentPage.value - 1) * productsPerPage.value
    const endIndex = startIndex + productsPerPage.value
    return applyFilter.value ? filteredProducts.value.slice(startIndex, endIndex) : products.value.slice(startIndex, endIndex)
})

const filteredProducts = ref([]);

watch(search, _debounce((newValue) => {
    applyFilter.value = true
    updateFilteredProducts(newValue)
}, 800))

const updateFilteredProducts = (newSearchValue) => {
    if (newSearchValue === '') {
        filteredProducts.value = products.value;
    } else {
        filteredProducts.value = products.value.filter(product => {
            if (product.title) {
                return product.title.toLowerCase().includes(newSearchValue.toLowerCase());
            }
            return false;
        })
    }
}

const prevPage = () => {
    if(currentPage.value > 1) {
        currentPage.value--
    }
}
const nextPage = () => {
    if(currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

const goToPage = (page) => {
    currentPage.value = page;
}

// const filteredProducts = computed(() => {
//     if(search.value === '') {
//         return products.value
//     }
    
//     return products.value.filter(product => {
//         if(product.title) {
//             return product.title.toLowerCase().includes(search.value.toLowerCase())
//         }
//         return false
//     })
// })

const sortType = ref('Название')

const sortedProducts = computed(() => {
    const sorted = [...displayedProducts.value]
    if (sortType.value === 'Название') {
        sorted.sort((a,b) => a.title.localeCompare(b.title))
    } else if (sortType.value === 'Цена') {
        sorted.sort((a,b) => a.price - b.price)
    } else if (sortType.value === 'Кол-во') {
        sorted.sort((a,b) => a.stock - b.stock)
    }
    return sorted
})

</script>
