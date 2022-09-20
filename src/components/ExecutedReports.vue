<template>
  <h1>Uitgevoerde rapportages</h1>
  <modal-list>
    <template v-slot:document>
      <div>
        <div class="list-row" v-for="report in this.reports" :key="report.id">
          <div>{{ report.name }}</div>
          <button class="btn" @click="toggleModal">Inzien</button>
        </div>
      </div>
    </template>
    <template v-slot:modal>
      <div class="report-content"></div>
    </template>
  </modal-list>
</template>

<script>
import ModalList from "./ModalList.vue";

export default {
  name: "ExecutedReports",

  components: {
    ModalList,
  },

  computed: {
    reports() {
      return this.$store.state.reports;
    },
  },
};
</script>

<style scoped></style>
