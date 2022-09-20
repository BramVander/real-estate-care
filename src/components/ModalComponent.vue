<template>
  <h1>Inspection details</h1>
  <button @click="log">log</button>
  <div class="container-details">
    <div v-if="this.currentInspection.data.date">
      <label>Datum</label><br />
      <input
        id="date"
        class="inspection-input"
        type="date"
        :value="this.slicedDate"
      />
    </div>

    <div v-if="this.currentInspection.data.description">
      <label>Beschrijving</label><br />
      <input
        id="description"
        class="inspection-input"
        type="text"
        :value="this.currentInspection.data.description"
      />
    </div>

    <div v-if="this.currentInspection.data.location">
      <label>Locatie</label><br />
      <textarea
        id="location"
        class="inspection-input"
        type="text"
        :value="this.currentInspection.data.location"
      >
      </textarea>
    </div>

    <div v-if="this.currentInspection.data.newDamage">
      <label>Nieuwe schade</label><br />
      <input id="newDamage" class="inspection-input" type="checkbox" checked />
    </div>

    <div v-if="this.currentInspection.data.type">
      <label>Type schade</label><br />
      <input
        id="type"
        list="types"
        name="type"
        :placeholder="this.currentInspection.data.type"
      />
      <datalist id="types">
        <option value="moedwillig"></option>
        <option value="slijtage"></option>
        <option value="geweld"></option>
        <option value="normaal gebruik"></option>
        <option value="calamiteit"></option>
        <option value="anders"></option>
      </datalist>
    </div>

    <div v-if="this.currentInspection.data.urgent">
      <input
        id="urgent"
        name="urgent"
        class="inspection-input"
        type="radio"
        :checked="this.currentInspection.data.urgent"
      />
      <label> Urgent</label><br />
      <input
        name="urgent"
        class="inspection-input"
        type="radio"
        :checked="!this.currentInspection.data.urgent"
      />
      <label> Niet urgent</label>
    </div>

    <div v-if="this.currentInspection.data.maintenance">
      <label>Soort onderhoud</label><br />
      <input
        id="maintenance"
        list="soort"
        name="soort"
        :placeholder="this.currentInspection.data.maintenance"
      />
      <datalist id="soort">
        <option value="Schilderwerk"></option>
        <option value="Houtrot"></option>
        <option value="Elektra"></option>
        <option value="Leidingwerk"></option>
        <option value="Beglazing"></option>
      </datalist>
    </div>

    <div v-if="this.currentInspection.data.price">
      <label>Prijs indicatie</label><br />
      <input
        :checked="this.currentInspection.data.price < 500"
        id="500-"
        type="radio"
        name="price"
      />
      <label for="500-">0-500</label><br />
      <input
        :checked="
          this.currentInspection.data.price >= 500 &&
          this.currentInspection.data.price <= 1500
        "
        id="500-1500"
        type="radio"
        name="price"
      />
      <label for="500-1500">500-1500</label><br />
      <input
        :checked="this.currentInspection.data.price > 1500"
        id="1500+"
        type="radio"
        name="price"
      />
      <label for="1500+">1500+</label>
    </div>

    <div v-if="this.currentInspection.data.installation">
      <label>Installatie</label><br />
      <input
        id="installation"
        list="soort"
        name="soort"
        :placeholder="this.currentInspection.data.installation"
      />
      <datalist id="soort">
        <option
          :selected="this.currentInspection.data.installation == 'Koeling'"
          value="Koeling"
        ></option>
        <option
          :selected="this.currentInspection.data.installation == 'Verwarming'"
          value="Verwarming"
        ></option>
        <option
          :selected="
            this.currentInspection.data.installation == 'Luchtverversing'
          "
          value="Luchtverversing"
        ></option>
        <option
          :selected="this.currentInspection.data.installation == 'Elektra'"
          value="Elektra"
        ></option>
        <option
          :selected="this.currentInspection.data.installation == 'Beveiliging'"
          value="Beveiliging"
        ></option>
      </datalist>
    </div>

    <div v-if="this.currentInspection.data.malfunctions">
      <label>Gemelde storingen</label><br />
      <textarea
        id="malfunctions"
        :value="this.currentInspection.data.malfunctions"
      ></textarea>
    </div>

    <div v-if="this.currentInspection.data.approved">
      <label>Goedgekeurd</label><br />
      <input
        id="approved"
        class="inspection-input"
        type="checkbox"
        :checked="this.currentInspection.data.approved"
      />
    </div>

    <div v-if="this.currentInspection.data.executed">
      <label>Uitgevoerd door</label><br />
      <input
        id="executed"
        list="uitgevoerd"
        name="uitgevoerd"
        :placeholder="this.currentInspection.data.executed"
      />
      <datalist id="uitgevoerd">
        <option value="Huurder"></option>
        <option value="Verhuurder"></option>
        <option value="Aannemer"></option>
        <option value="Onbekend"></option>
      </datalist>
    </div>

    <div v-if="this.currentInspection.data.toDo">
      <label>Te ondernemen actie</label><br />
      <input
        id="todo"
        list="actie"
        name="actie"
        :placeholder="this.currentInspection.data.toDo"
      />
      <datalist id="actie">
        <option value="Accepteren"></option>
        <option value="Laten keuren"></option>
        <option value="Laten verwijderen"></option>
        <option value="Laten aanpassen en keuren"></option>
      </datalist>
    </div>

    <button type="button" class="btn" @click="editInspection">
      Wijzigingen opslaan
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  computed: {
    currentInspection() {
      return this.$store.state.currentInspection;
    },

    slicedDate() {
      return this.$store.state.currentInspection.data.date.slice(0, 10);
    },
  },

  methods: {
    log() {
      console.log(
        "installation",
        this.currentInspection.data.installation == "Verwarming"
      );
    },

    editInspection(e) {
      e.preventDefault();
      // we loop through object properties
      // for each prop, we search element with same id and take the new value
      // Object.keys(this.currentInspection.data).forEach(function (prop) {
      //   if (prop == "price") {
      //     console.log(document.querySelector(`input[name=${prop}]:checked`).id);
      //   } else {
      //     updatedInspection.data.prop = document.getElementById(
      //       `${prop}`
      //     ).value;
      //     console.log("data", updatedInspection.data);
      //   }
      // });

      // ^ werkt niet, updatedInspection.data.prop[L:240] geen toegang tot prop

      // get current inspection, lets use a getter here
      const updatedInspection = this.$store.getters.getInspection(
        this.currentInspection.id
      );

      // get elements that will contain the new value
      const newDate = document.getElementById("date");
      const newDescription = document.getElementById("description");
      const newLocation = document.getElementById("location");
      const newNewDamage = document.getElementById("newDamage");
      const newMaintenance = document.getElementById("maintenance");
      const newMalfunctions = document.getElementById("malfunctions");
      const newApproved = document.getElementById("approved");
      const newNotes = document.getElementById("notes");

      // we check inspection.name to get correct new property values
      switch (updatedInspection.name) {
        case "Schade opnemen":
          axios.patch(
            `http://localhost:3000/inspections/` + this.currentInspection.id,
            {
              data: {
                date: newDate.value,
                location: newLocation.value,
                newDamage: newNewDamage.value,
                description: newDescription.value,
              },
            }
          );
          // we fill store with updated inspection
          this.$store.dispatch("fetchInspections");
          // we update currentInspection
          console.log("id", this.currentInspection.id);
          this.$store.dispatch(
            "setCurrentInspection",
            this.$store.state.inspections[this.currentInspection.id - 1]
          );

          break;
        case "Achterstallig onderhoud opnemen":
          axios.patch(
            `http://localhost:3000/inspections/` + this.currentInspection.id,
            {
              data: {
                date: newDate.value,
                location: newLocation.value,
                maintenance: newMaintenance.value,
              },
            }
          );
          // we fill store with updated inspection
          this.$store.dispatch("fetchInspections");
          // we update currentInspection
          this.$store.dispatch(
            "setCurrentInspection",
            this.$store.state.inspections[this.currentInspection.id - 1]
          );
          break;
        case "Technische installaties inspecteren":
          axios.patch(
            `http://localhost:3000/inspections/` + this.currentInspection.id,
            {
              data: {
                date: newDate.value,
                location: newLocation.value,
                malfunctions: newMalfunctions.value,
                approved: newApproved.value,
                notes: newNotes.value,
              },
            }
          );
          // we fill store with updated inspection
          this.$store.dispatch("fetchInspections");
          // we update currentInspection
          this.$store.dispatch(
            "setCurrentInspection",
            this.$store.state.inspections[this.currentInspection.id - 1]
          );
          break;
        case "Modificaties inventariseren":
          axios.patch(
            `http://localhost:3000/inspections/` + this.currentInspection.id,
            {
              data: {
                date: newDate.value,
                location: newLocation.value,
                newDamage: newNewDamage.value,
                description: newDescription.value,
              },
            }
          );
          // we fill store with updated inspection
          this.$store.dispatch("fetchInspections");
          // we update currentInspection
          this.$store.dispatch(
            "setCurrentInspection",
            this.$store.state.inspections[this.currentInspection.id - 1]
          );
          break;
      }
    },
  },
};
</script>

<style>
.container-details {
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}
</style>
