<template>
  <div>
    <h2>Assign Points</h2>
    <p class="mt-5 mb-2">Did highest points win or was it kinda like golf?</p>
      <v-btn-toggle v-model="isLowWins" mandatory class="mb-3">
        <v-btn>High wins</v-btn>
        <v-btn>Low wins</v-btn>
      </v-btn-toggle>
    <p class="mt-5 mb-0">How many points did everyone get?</p>
    <v-form @submit.prevent>
      <!-- <v-checkbox v-model="isLowWins" label="Highest points win"></v-checkbox> -->
      <v-text-field
      v-for="player in players"
      :key="player.id" :label="player.fullName"
      v-model.number="pointAssignment[player._id]"
      type="number">
      </v-text-field>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "StandingsPoints.vue",
  data() {
    return {
      players: [],
      pointAssignment: null,
      isLowWins: null,
    }
  },
  created() {
    this.initializeData();
  },
  methods: {
    initializeData() {
      this.players = this.$store.state.record.players;
      
      if (this.$store.state.record.recordGameType === this.$root.$data.enumGameType.POINTS.HIGH_WINS) {
        this.isLowWins = true;
      }
      
      let pointsObj = new Object;
      this.players.forEach(player => {
        let id = player._id;
        pointsObj[id] = null;
      });
      this.pointAssignment = pointsObj;
    },
    allFilled() {
      for (const playerPoints in this.pointAssignment) {
        if (this.pointAssignment[playerPoints] === null || this.pointAssignment[playerPoints] === "") {
          return false;
        }
      }
      return true;
    },
  },
  watch: {
    isLowWins: {
      handler: function() {
        let gameType = this.$root.$data.enumGameType.POINTS.HIGH_WINS;
        if (this.isLowWins === 1) {
          gameType = this.$root.$data.enumGameType.POINTS.LOW_WINS;
        }
        this.$store.commit("record/updateRecordGameType", gameType)
      }
    },
    pointAssignment: {
      handler: function() {
        this.$store.commit("record/updateRecordPoints", this.pointAssignment);
        // if (this.allFilled()) {
        //   this.$store.commit("changeRecordStep", 5);
        // }
        // else {
        //   this.$store.commit("changeRecordStep", 4);
        // }
      },
      deep: true,                                          // Needed to watch for object property changes
    }
  },
}
</script>