<template>
    <div class="popular" v-if="products">
        <div class="container">
            <h2 class="popular__title">Популярное</h2>
            <div class="popular__box">
                <swiper 
                class="popular__box-swiper"
                :slidesPerView="3"
                :spaceBetween="20"
                :modules="modules"
                :breakpoints="breakpoints"
                :pagination="{
                clickable: true,
                }"
                >
                    <swiper-slide
                    v-for="img in popularProducts" 
                    :key="img.id"
                    class="popular__box-swiper-slide"
                    >
                        <router-link :to="`/products/${img.id}`">
                            <img :src="img.thumbnail" alt="" class="popular__box-swiper-slide-img">    
                        </router-link>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { productsStore } from '../stores/products';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';

const store = productsStore()
const products = computed(() => store.products)
store.getProducts().then(() => {
  console.log(store.products);
});

const popularProducts = computed(() => {
    if (products.value && Array.isArray(products.value)) {
        return products.value.filter(item => item.rating > 4.92)
    }
})

const modules = ref([Pagination])

let breakpoints = ref({
    320: {
        slidesPerView: 1
    },
    750: {
        slidesPerView: 2
    },
    900: {
        slidesPerView: 2
    },
    1200: {
        slidesPerView: 3
    },
    1400: {
        slidesPerView: 3
    }
})
</script>

<style lang="scss" scoped>

</style>