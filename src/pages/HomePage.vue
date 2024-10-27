<template>
  <v-container>
    <h1 style="margin-bottom: 1.5rem">Produtos</h1>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
        <ProductCard :product="product" @edit="openEditModal" @delete="deleteProduct" />
      </v-col>
    </v-row>

    <EditProductModal
      v-if="selectedProduct"
      :product="selectedProduct"
      @close="selectedProduct = null"
      @update="fetchProducts"
    />
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useProductStore } from '../stores/productStore';
import EditProductModal from '../components/EditProductModal.vue';
import ProductCard from '../components/ProductCard.vue';

const productStore = useProductStore();
const products = computed(() => productStore.products);
const selectedProduct = ref(null);

const openEditModal = (product) => {
  selectedProduct.value = { ...product };
};

const fetchProducts = productStore.fetchProducts;
const deleteProduct = productStore.deleteProduct;

onMounted(() => {
  fetchProducts();
});
</script>
