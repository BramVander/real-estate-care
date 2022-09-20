<template>
  <div>
    <h1>Welkom terug</h1>
    <p>Je bevindt je op het dashboard</p>
  </div>

  <button @click="log()">log</button>
</template>

<script>
export default {
  name: "DashBoard",

  methods: {
    log() {
      console.log("currentUser", this.$store.state.currentUser);
    },
  },
};
</script>

<style scoped></style>
