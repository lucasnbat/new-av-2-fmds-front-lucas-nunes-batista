<template>
  <v-card>
    <v-card-title>{{ product.description }}</v-card-title>
    <v-card-subtitle>Quantidade: {{ product.quantity }}</v-card-subtitle>
    <v-card-text>Preço: R$ {{ product.price }}</v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="editProduct">Editar</v-btn>
      <v-btn color="error" @click="deleteProduct">Deletar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  }
});

const emit = defineEmits(['edit', 'delete']);

const editProduct = () => {
  emit('edit', props.product);
};

const deleteProduct = () => {
  emit('delete', props.product.id);
};
</script>
