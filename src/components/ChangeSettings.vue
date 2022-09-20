<template>
  <h1>Instellingen beheren</h1>
  <p>Beheer hier je instellingen</p>
  <div class="container">
    <div class="card">
      <div class="form-left">
        <div class="container-avatar">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="avatar"
            id="avatar"
            class="avatar"
          />
          <button class="btn" @click="changeAvatar">Edit</button>
        </div>
        <label for="">Personeelsnr</label>
        <input
          id="personeelsnr"
          type="text"
          placeholder="#011235813"
          disabled
        />
        <label for="password">Pin</label>
        <input
          id="password"
          type="password"
          placeholder="#Pin"
          pattern="^\d{4,}$"
          title="4 of meer nummers"
        />
        <i id="eye" class="bi bi-eye-fill" @click="togglePassword"></i>
        <button class="btn" @click="changePin">Onthoud voorkeur</button>
      </div>
      <div class="form-right">
        <p>Darkmode</p>
        <label class="switch">
          <input type="checkbox" :checked="this.dark" @click="darkMode" />
          <span class="slider round"></span>
        </label>
        <p>Notifications</p>
        <label class="switch">
          <input type="checkbox" :checked="this.notify" @click="notifyMe" />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ChangeSettings",

  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    },

    notify() {
      return this.$store.state.users[this.currentUser.id - 1].notify;
    },

    dark() {
      return this.$store.state.users[this.currentUser.id - 1].darkmode;
    },
  },

  methods: {
    // show password after touching the eye icon
    togglePassword() {
      document.getElementById("password").type == "password"
        ? (document.getElementById("password").type = "text")
        : (document.getElementById("password").type = "password");

      if (document.getElementById("eye").classList == "bi bi-eye-fill") {
        document.getElementById("eye").classList.remove("bi-eye-fill");
        document.getElementById("eye").classList.add("bi-eye-slash-fill");
      } else {
        document.getElementById("eye").classList.remove("bi-eye-slash-fill");
        document.getElementById("eye").classList.add("bi-eye-fill");
      }
    },

    // method to change avatar
    changeAvatar() {
      alert(
        `document.getElementById("avatar").setAttribute('src', 'uploaded img path') \n\n\n\n AVATAR CHANGED`
      );
    },

    changePin(e) {
      e.preventDefault();
      // get the new pin
      const newPin = Number(document.getElementById("password").value);
      // check if newPin is a number
      if (Number.isFinite(newPin)) {
        // patch db.json with new pin
        axios.patch(`http://localhost:3000/users/` + this.currentUser.id, {
          pin: newPin,
        });
        // call fetchUsers in store for updated user info
        this.$store.dispatch("fetchUsers");
      } else {
        // pattern attribute op input werkt niet wanneer ik ook een functie call
        // input.oninvalid werkt niet
        // target.setCustomValidity('werkt niet')
        alert("Verkeerde invoer. Pin wil minstens 4 cijfers.");
      }
    },

    // toggle notifications
    notifyMe() {
      axios.patch(`http://localhost:3000/users/` + this.currentUser.id, {
        notify: !this.$store.state.users[this.currentUser.id - 1].notify,
      });
      // call fetchUsers in store for updated user info
      this.$store.dispatch("fetchUsers");

      // // we grab the userobject based on id
      // const updateUserNotify = this.$store.state.users.find(
      //   (u) => u.id === this.$store.state.currentUser.id
      // );
      // // update the userobject
      // updateUserNotify.notify = !updateUserNotify.notify;
      // // dispatch the updated userobject
      // this.$store.dispatch("updateUser", updateUserNotify);

      this.notify == false
        ? alert("I will notify you")
        : alert("No more notifications");
    },

    // toggle darkmode
    darkMode() {
      // toggle preference
      axios.patch(`http://localhost:3000/users/` + this.currentUser.id, {
        darkmode: !this.$store.state.users[this.currentUser.id - 1].darkmode,
      });
      // call fetchUsers in store for updated user info
      this.$store.dispatch("fetchUsers");

      // // we grab userobject based on id
      // const updateUserDarkmode = this.$store.getters.getUser(
      //   this.$store.state.currentUser.id
      // );
      // // const updateUserDarkmode = this.$store.state.users.find(
      // //   (u) => u.id === this.$store.state.currentUser.id
      // // );
      // // update userobject
      // updateUserDarkmode.darkmode = !updateUserDarkmode.darkmode;
      // // dispatch updated userobject
      // this.$store.dispatch("updateUser", updateUserDarkmode);

      // collect elements
      const app = document.getElementById("app");
      const logo = document.getElementById("logo");
      const password = document.getElementById("password");
      const nav = document.getElementsByClassName("nav");
      const container = document.getElementsByClassName("container");
      const card = document.getElementsByClassName("card");
      // change style to dark
      if (this.$store.state.users[this.currentUser.id - 1].darkmode == false) {
        app.style.backgroundColor = "var(--gradientDark)";
        password.style.backgroundColor = "gray";
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
        // change style to light
      } else {
        app.style.backgroundColor = "var(--cyan)";
        password.style.backgroundColor = "white";
        logo.style.opacity = 1;
        for (let i = 0; i < nav.length; i++) {
          nav[i].style.backgroundColor = "white";
        }
        for (let i = 0; i < container.length; i++) {
          container[i].style.backgroundColor = "#f1f2f3";
          container[i].style.color = "var(--text)";
        }
        for (let i = 0; i < card.length; i++) {
          card[i].style.backgroundColor = "white";
          card[i].style.color = "var(--text)";
        }
      }
    },
  },
};
</script>

<style scoped>
.container-avatar {
  display: flex;
  flex-direction: row;
}

.btn {
  align-self: center;
  margin-inline: 20px;
  padding: 5px;
  width: 100%;
}

#form-settings {
  display: flex;
  flex-direction: row;
}

.form-left,
.form-right {
  display: flex;
  flex-direction: column;
}

.form-right {
  padding-top: 50px;
  padding-left: 20px;
}

.avatar {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

#eye {
  color: var(--cyan);
  position: relative;
  bottom: 32px;
  left: 170px;
}

#eye:hover {
  cursor: pointer;
}

/* switchbox darkmode & notifications */
.switch {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 17px;
  margin-block-end: 10px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 13px;
  width: 13px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--cyan);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--cyan);
}

input:checked + .slider:before {
  -webkit-transform: translateX(12px);
  -ms-transform: translateX(12px);
  transform: translateX(12px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

@media (max-width: 426px) {
  #form-settings {
    flex-direction: column;
  }
}
</style>
