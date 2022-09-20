<template>
  <div class="container">
    <div v-if="!isLoading">
      <h1>Welkom!</h1>
      <p>Log in met je gegevens om verder te gaan.</p>
      <div class="card">
        <div>
          <form id="form-login" action="">
            <label for="user">Gegevens monteur</label>
            <input
              id="user"
              type="number"
              min="1"
              max="99999999"
              placeholder="# Personeelsnr"
              value="11235813"
            />
            <label for="pin"></label>
            <input
              id="pin"
              class="input"
              type="password"
              placeholder="# Pin"
              value="fibonacci"
            />
            <i id="eye" class="bi bi-eye-fill" @click="togglePassword"></i>
          </form>
        </div>
        <div>
          <button
            class="btn btn-login"
            form="form-login"
            title="Log in"
            @click="logIn"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              fill="currentColor"
              class="bi bi-person-badge-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm4.5 0a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 12.825 10.623 12 8 12s-4.146.826-5 1.755V14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div v-else>spinner</div>
  </div>
</template>

<script>
// import MyService from "@/services/MyService";

export default {
  name: "LoginScreen",

  computed: {
    users() {
      return this.$store.state.users;
    },
    currentUser() {
      return this.$store.state.currentUser;
    },
    currentInspection() {
      return this.$store.state.currentInspection;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    errors() {
      return this.$store.state.errors;
    },
  },

  // we fetch user data before mount so we can check password on login.
  beforeMount() {
    this.$store.dispatch("fetchUsers");
  },

  methods: {
    // login function
    logIn(e) {
      e.preventDefault();
      const username = document.getElementById("user").value;
      const pincode = document.getElementById("pin").value;
      // set loader
      this.$store.dispatch("isLoading", true);
      // check current login vs userdata
      if (
        this.$store.state.users.find(
          (o) => o.personeelsnr == username && o.pin == pincode
        )
      ) {
        // fetch current user, inspections, reports, documents
        this.setCurrentUser();
        this.setInspections();
        this.setReports();
        this.setDocuments();
        // check current user preference
        if (this.$store.state.currentUser.darkmode) {
          const app = document.getElementById("app");
          const logo = document.getElementById("logo");
          const nav = document.getElementsByClassName("nav");
          const container = document.getElementsByClassName("container");
          const card = document.getElementsByClassName("card");

          app.style.backgroundColor = "var(--gradientDark)";
          logo.style.opacity = 0.1;
          for (let i = 0; i < nav.length; i++) {
            nav[i].style.backgroundColor = "rgb(50 61 58)";
          }
          for (let i = 0; i < container.length; i++) {
            container[i].style.backgroundColor = "rgb(50 61 58)";
            container[i].style.color = "white";
          }
          for (let i = 0; i < card.length; i++) {
            card[i].style.backgroundColor = "#404d47";
            card[i].style.color = "white";
          }
        }
        // 2FA & welcome user
        prompt("Please enter the 2FA code from your phone");
        alert(`Welcome back ${this.currentUser.personeelsnr}`);
        // set loader
        this.$store.dispatch("isLoading", false);
        // nav to dashboard
        this.$router.push("dashboard");
      } else {
        // set loader
        this.$store.dispatch("isLoading", false);
        // on failed login we alert and redirect back to login
        alert("No matching credentials found");
        this.$router.push("/");
      }
    },

    // show password after touching the eye icon
    togglePassword() {
      document.getElementById("pin").type == "password"
        ? (document.getElementById("pin").type = "text")
        : (document.getElementById("pin").type = "password");

      if (document.getElementById("eye").classList == "bi bi-eye-fill") {
        document.getElementById("eye").classList.remove("bi-eye-fill");
        document.getElementById("eye").classList.add("bi-eye-slash-fill");
      } else {
        document.getElementById("eye").classList.remove("bi-eye-slash-fill");
        document.getElementById("eye").classList.add("bi-eye-fill");
      }
    },

    // store actions
    setInspections() {
      this.$store.dispatch("fetchInspections");
    },
    setReports() {
      this.$store.dispatch("fetchReports");
    },
    setDocuments() {
      this.$store.dispatch("fetchDocuments");
    },
    setUsers() {
      this.$store.dispatch("fetchUsers");
    },
    setCurrentUser() {
      this.$store.dispatch(
        "setCurrentUser",
        this.$store.state.users.find(
          (o) =>
            o.personeelsnr == document.getElementById("user").value &&
            o.pin == document.getElementById("pin").value
        )
      );
    },
  },
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  margin-inline-end: 1rem;
}

.btn-login {
  height: 100%;
  width: 100%;
  border-radius: 0.5rem !important;
}

#eye {
  color: var(--cyan);
  position: relative;
  bottom: 32px;
  left: 170px;
  width: fit-content;
}

#eye:hover {
  cursor: pointer;
}

/* media query for mobile */
@media (max-width: 425px) {
  .card {
    flex-direction: column;
    align-items: center;
  }
}
</style>
