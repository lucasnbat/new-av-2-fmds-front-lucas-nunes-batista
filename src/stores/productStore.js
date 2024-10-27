import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        console.log("Dados recebidos:", response.data);
        this.products = response.data;
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    },
    async addProduct(product) {
      try {
        const response = await axios.post('http://localhost:3001/api/products', product);
        this.products.push(response.data);
      } catch (error) {
        console.error('Erro ao adicionar produto:', error);
      }
    },
    async updateProduct(product) {
      await axios.put(`http://localhost:3001/api/products/${product.id}`, product);
      await this.fetchProducts();
    },
    async deleteProduct(productId) {
      await axios.delete(`http://localhost:3001/api/products/${productId}`);
      this.products = this.products.filter((p) => p.id !== productId);
    },
  },
});
