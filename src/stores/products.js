import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const productsStore = defineStore('products', () => {
  let products = ref(null)
  const getProducts = async () => {
    try {
      let response = await axios.get(`https://dummyjson.com/products?limit=100`)
      products.value = response.data.products
      // console.log(products.value);
    } catch (error) {
      console.error('Ошибка при получении данных ' + error)
    }
  }

  return { products, getProducts, }
})
