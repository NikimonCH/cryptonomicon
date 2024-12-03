<template>
  <slot></slot>
  <div class="card-container">
    <div v-for="card in items" :key="card" class="card">
      <h3 class="name">{{ card.name }}</h3>
      <h2 class="price">{{ card.price }}</h2>
      <button class="button" @click="deleteItem(card)">Удалить</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemList",
  props: {
    items: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  emits: {
    "delete-item": {
      type: String,
    },
  },
  methods: {
    deleteItem(itemToRemove) {
      this.$emit("delete-item", itemToRemove);
    },
  },
};
</script>

<style scoped>
.card-container {
  padding: 10px;
  width: 70%;
  margin: auto;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(30px, 1fr));
  grid-auto-flow: row;
  grid-gap: 10px;
  align-items: start;
}
.card {
  display: flex;
  flex-direction: column;
  width: 10rem;
  margin: auto;
  aspect-ratio: 1;
  border: 1px solid rgb(210, 210, 210);
  background-color: rgb(238, 238, 238);
  border-radius: 5px;
  box-shadow: 1px 1px 5px 0px rgba(34, 60, 80, 0.2);

  .name {
    margin: auto;
  }
  .price {
    margin: auto;
  }
  button {
    width: 5rem;
    height: 20px;
    aspect-ratio: 1;
    margin: auto;
    margin-bottom: 10px;
  }
}
</style>
