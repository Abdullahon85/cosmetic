<template>
    <div class="product" v-if="product">
        <div class="container">
            <div class="product__box">
                <div class="product__box-images">
                    <swiper 
                    :cssMode="true"
                    :navigation="true"
                    :pagination="true"
                    :mousewheel="true"
                    :keyboard="true"
                    :modules="modules"
                    class="product__box-images-swiper">
                        <swiper-slide
                        class="product__box-images-slide"
                        v-for="img in product.images"
                        :key="img"
                        >
                            <img :src="img" alt="" class="product__box-slider-img">
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="product__box-description">
                    <h2 class="product__box-description-title">{{ product.title }}</h2>
                    <p class="product__box-description-about">{{ product.description }}</p>
                    <p class="product__box-description-stock">Кол-во: {{ product.stock }}</p>
                    <p class="product__box-description-price">Цена: {{ product.price }}$</p>
                    <p class="product__box-description-discountPrice">Цена: {{ product.price - (Math.round(product.price * (Math.round(product.discountPercentage) / 100))) }}$</p>
                </div>
            </div>    
        </div>
    </div>
    <Loader v-else/>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

const route = useRoute()
// console.log(route);

let product = ref(null)
const getProduct = async () => {
    try {
      let response = await axios.get(`https://dummyjson.com/products?limit=100`)
      let answer = response.data.products
      product.value = answer.find(el => el.id == route.params.id)
      console.log(product);
    } catch (error) {
      console.error('Ошибка при получении данных ' + error)
    }
  }

getProduct()

let modules = ref([Navigation, Pagination, Mousewheel, Keyboard])

</script>
