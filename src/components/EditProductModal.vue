<template>
  <v-dialog v-model="dialog" max-width="500px" persistent>
    <v-card>
      <v-card-title>Edição de Produto</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit.prevent="updateProduct">
          <v-text-field label="Descrição" v-model="localProduct.description" required></v-text-field>
          <v-text-field label="Quantidade" v-model="localProduct.quantity" type="number" required></v-text-field>
          <v-text-field label="Preço" v-model="localProduct.price" type="number" required></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
        <v-btn color="green darken-1" text :disabled="!isFormValid" @click="updateProduct">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useProductStore } from '../stores/productStore';
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  }
});
const emit = defineEmits(['close', 'update']);

const productStore = useProductStore();
const dialog = ref(true);
const localProduct = ref({ ...props.product });

const isFormValid = computed(() => localProduct.value.description && localProduct.value.quantity && localProduct.value.price);

watch(
  () => props.product,
  (newVal) => {
    localProduct.value = { ...newVal };
  }
);

const close = () => {
  dialog.value = false;
  emit('close');
};

const updateProduct = async () => {
  localProduct.value.price = parseInt(localProduct.value.price, 10);
  localProduct.value.quantity = parseInt(localProduct.value.quantity, 10);

  try {
    await productStore.updateProduct(localProduct.value);
    emit('update');
    close();
  } catch (error) {
    console.error('Erro ao atualizar o produto:', error);
  }
};
</script>
