<template>
  <div class="container">
    <div class="list">
      <div class="document-row">
        <slot name="document"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalList",
};
</script>

<style scoped></style>
