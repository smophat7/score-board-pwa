<template>
  <div>
    <h2>Assign Points</h2>
      <v-btn-toggle class="my-4"
          v-model="isLowWins"
          mandatory
          rounded
        >
          <v-btn>High wins</v-btn>
          <v-btn>Low wins</v-btn>
        </v-btn-toggle>
    <v-container>
      <v-form @submit.prevent>
        <!-- <v-checkbox v-model="isLowWins" label="Highest points win"></v-checkbox> -->
        <v-text-field
        v-for="player in players"
        :key="player.id" :label="player.fullName"
        v-model.number="pointAssignment[player.id]"
        type="number">
        </v-text-field>
      </v-form>
    </v-container>
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
      this.players = this.$store.state.recordPlayers;
      
      if (this.$store.state.recordGameType === this.$root.$data.enumGameType.POINTS.HIGH_WINS) {
        this.isLowWins = true;
      }
      
      let pointsObj = new Object;
      this.players.forEach(player => {
        let id = player.id;
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
        this.$store.commit("updateRecordGameType", gameType)
      }
    },
    pointAssignment: {
      handler: function() {
        this.$store.commit("updateRecordPoints", this.pointAssignment);
        if (this.allFilled()) {
          this.$store.commit("changeRecordStep", 5);
        }
        else {
          this.$store.commit("changeRecordStep", 4);
        }
      },
      deep: true,                                          // Needed to watch for object property changes
    }
  },
}
</script>