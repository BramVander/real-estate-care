import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    users: [],
    currentUser: [],

    inspections: [],
    currentInspection: [],

    reports: [],
    documents: [],

    errors: [],
    isLoading: false,
  },

  mutations: {
    IS_LOADING(state, payload) {
      state.isLoading = payload;
    },

    ADD_ERROR(state, payload) {
      state.errors = [...state.errors, payload];
    },
    // USERS
    SET_USERS(state, payload) {
      state.users = payload;
    },

    CURRENT_USER(state, payload) {
      state.currentUser = payload;
    },

    UPDATE_USER(state, user) {
      const update = state.users.find((u) => u.id === user.id);
      state.users.update = user;
      // we need to do something with update to prevent unused variable error
      update === update ? console.log("") : console.log("");
    },

    // INSPECTIONS
    SET_INSPECTIONS(state, payload) {
      state.inspections = payload;
    },

    CURRENT_INSPECTION(state, payload) {
      state.currentInspection = payload;
    },

    UPDATE_INSPECTION(state, inspection) {
      const update = state.inspections.find((i) => i.id === inspection.id);
      state.inspections.update = inspection;
      // we need to do something with update to prevent unused variable error
      update === update ? console.log("") : console.log("");
    },

    // REPORTS
    SET_REPORTS(state, payload) {
      state.reports = payload;
    },

    // DOCUMENTS
    SET_DOCUMENTS(state, payload) {
      state.documents = payload;
    },
  },

  actions: {
    isLoading(context, value) {
      context.commit("IS_LOADING", value);
    },

    addError(context, err) {
      context.commit("ADD_ERROR", err);
    },

    // USERS
    async fetchUsers(context) {
      await axios
        .get("http://localhost:3000/users")
        .then((result) => {
          context.commit("SET_USERS", result.data);
        })
        .catch((err) => {
          context.commit("ADD_ERROR", err);
        });
    },

    setCurrentUser(context, value) {
      context.commit("CURRENT_USER", value);
    },

    // updateUser(context, user) {
    //   context.commit("UPDATE_USER", user);
    // },

    // INSPECTIONS
    async fetchInspections(context) {
      await axios
        .get("http://localhost:3000/inspections")
        .then((result) => {
          context.commit("SET_INSPECTIONS", result.data);
        })
        .catch((err) => {
          context.commit("ADD_ERROR", err);
        });
    },

    setCurrentInspection(context, value) {
      context.commit("CURRENT_INSPECTION", value);
    },

    updateInspection(context, inspection) {
      context.commit("UPDATE_INSPECTION", inspection);
    },

    // REPORTS
    async fetchReports(context) {
      await axios
        .get("http://localhost:3000/reports")
        .then((result) => {
          context.commit("SET_REPORTS", result.data);
        })
        .catch((err) => {
          context.commit("ADD_ERROR", err);
        });
    },
    //DOCUMENTS
    async fetchDocuments(context) {
      await axios
        .get("http://localhost:3000/documents")
        .then((result) => {
          context.commit("SET_DOCUMENTS", result.data);
        })
        .catch((err) => {
          context.commit("ADD_ERROR", err);
        });
    },
  },

  getters: {
    // fetch inspection according to id
    getInspection: (state) => (id) => {
      return state.inspections.find((i) => i.id === id);
    },

    // fetch report according to id
    getReport: (state) => (id) => {
      return state.reports.find((r) => r.id === id);
    },

    // fetch document according to id
    getDocument: (state) => (id) => {
      return state.documents.find((d) => d.id === id);
    },

    getUser: (state) => (id) => {
      return state.users.find((u) => u.id === id);
    },
  },
});
