<template>
  <h1>Toegewezen taken</h1>

  <modal-list>
    <template v-slot:document>
      <div>
        <div
          class="list-row"
          v-for="inspection in this.sortedInspections"
          :key="inspection.id"
          :data-inspection-id="inspection.id"
          @click="showInspection(inspection)"
        >
          <div style="width: 50%">{{ inspection.name }}</div>
          <!-- we return the first 10 digits on inspection.data.date for YYYY-MM-DD -->
          <div>{{ inspection.data.date.slice(0, 10) }}</div>
          <button class="btn">Inzien</button>
        </div>
      </div>
    </template>
  </modal-list>
</template>

<script>
import ModalList from "./ModalList.vue";

export default {
  name: "AssignedTasks",

  components: {
    ModalList,
  },

  data() {
    return {
      sortedInspections: [],
    };
  },

  computed: {
    inspections() {
      return this.$store.state.inspections;
    },
  },

  // on page mount we create a date-sorted list of inspections
  mounted() {
    // we need this.inspections to be immutable so we can search index with this.inspections[id-1]
    this.sortedInspections = this.$store.state.inspections.slice();
    this.sortedInspections.sort(function (a, b) {
      let dateA = new Date(a.data.date);
      let dateB = new Date(b.data.date);
      return dateA - dateB;
    });
  },

  methods: {
    showInspection(inspection) {
      // we push clicked inspection to currentInspection
      this.$store.dispatch(
        "setCurrentInspection",
        this.$store.state.inspections[inspection.id - 1]
      );
      // we navigate to detail page
      this.$router.push({
        name: "detail",
        params: {
          id: inspection.id,
        },
      });
    },
  },
};
</script>

<style scoped></style>
