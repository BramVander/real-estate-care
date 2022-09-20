<template>
  <h1>Documentenlijst</h1>
  <modal-list>
    <template v-slot:document>
      <div>
        <div
          class="list-row"
          v-for="document in this.documents"
          :key="document.id"
        >
          <div>{{ document.name }}</div>
          <button class="btn" @click="toggleModal">Inzien</button>
        </div>
      </div>
    </template>
    <template v-slot:modal>
      <div class="document-content"></div>
    </template>
  </modal-list>
</template>

<script>
import ModalList from "./ModalList.vue";

export default {
  name: "DocumentList",

  components: {
    ModalList,
  },

  computed: {
    documents() {
      return this.$store.state.documents;
    },
  },

  methods: {
    // open document in modal
    toggleModal(e) {
      e.preventDefault();
      alert(`modal opened https://vuejs.org/examples/#modal`);
    },
  },
};
</script>

<style scoped></style>
