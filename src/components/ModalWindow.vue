<template>
  <div v-if="isOpen" class="main">
    <slot name="content"></slot>
    <hr />
    <slot name="actions"> </slot>
  </div>
</template>
<script>
export default {
  name: "ModalWindow",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    "close-modal": {
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("close-modal");
    },
  },
};
</script>
<style scoped>
.main {
  position: absolute;
  background-color: aliceblue;
  top: 25%;
  left: 25%;

  width: 50%;
  height: 50%;
  border: 1px solid black;
}
</style>
