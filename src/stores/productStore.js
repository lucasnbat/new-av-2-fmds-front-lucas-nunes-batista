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
        const formattedProduct = {
          ...product,
          price: parseFloat(product.price).toFixed(2) // Ensure price is a decimal
        };
        const response = await axios.post('http://localhost:3001/api/products', formattedProduct);
        this.products.push(response.data);
      } catch (error) {
        console.error('Erro ao adicionar produto:', error);
      }
    },
    async updateProduct(product) {
      try {
        const formattedProduct = {
          ...product,
          price: parseFloat(product.price).toFixed(2) // Ensure price is a decimal
        };
        await axios.put(`http://localhost:3001/api/products/${product.id}`, formattedProduct);
        await this.fetchProducts(); // Refresh product list
      } catch (error) {
        console.error('Erro ao atualizar produto:', error);
      }
    },
    async deleteProduct(productId) {
      try {
        await axios.delete(`http://localhost:3001/api/products/${productId}`);
        this.products = this.products.filter((p) => p.id !== productId);
      } catch (error) {
        console.error('Erro ao deletar produto:', error);
      }
    },
  },
});
