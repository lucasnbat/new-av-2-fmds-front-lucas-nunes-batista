<template>
  <v-container style="max-width: 900px; margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem">
    <h1>Cadastrar Novo Produto</h1>
    <v-form ref="form" @submit.prevent="addProduct" :model-value="isFormValid">
      <v-text-field style="border-radius: 1.5rem;" label="Descrição" v-model="description" required></v-text-field>
      <v-text-field style="border-radius: 1.5rem;" label="Quantidade" v-model="quantity" type="number"
        required></v-text-field>
      <v-text-field style="border-radius: 1.5rem;" label="Preço" v-model="price" type="number" step="0.01"
        required></v-text-field>
      <v-btn color="primary" :disabled="!isFormValid" @click="addProduct">Cadastrar</v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useProductStore } from '../stores/productStore';
import { useRouter } from 'vue-router';

const productStore = useProductStore();
const description = ref('');
const quantity = ref(0);
const price = ref(0);
const router = useRouter();

const isFormValid = computed(() => description.value && quantity.value > 0 && price.value > 0);

const addProduct = async () => {
  const productData = {
    description: description.value,
    quantity: parseInt(quantity.value, 10),
    price: parseFloat(price.value).toFixed(2) // Armazena como decimal com duas casas
  };

  try {
    await productStore.addProduct(productData);
    router.push('/');
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
  }
};

</script>
