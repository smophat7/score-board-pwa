<template>
  <div>
    <h2>Rank Players</h2>
    <p>Drag players to the appropriate boxes.</p>

    <!-- Using "(e, index)" instead of just "index" in the v-for makes it so that the -->
    <!-- resulting index value is 0-based instead of 1-based, which is a weird default -->
    <v-row class="px-1">
      <v-col cols="12" sm="6" md="4" v-for="(e, index) in rankings.length" :key="index">
        <div class="elevation-2 rounded-lg px-2 py-2">
          <h3>{{ index + 1 }}</h3>
          <v-list>
            <draggable v-model='rankings[index]' group="rank" class="draggable-section">
              <template v-for="player in rankings[index]">
                <v-list-item :key="player.id">
                  <v-list-item-content>
                    <v-chip label>
                      <v-avatar left>
                        <v-img :src="'../img/profiles/' + player.profilePicture" :alt="player.fullName + ' avatar icon'"></v-img>
                      </v-avatar>
                      {{ player.fullName }}
                    </v-chip>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </draggable>
          </v-list>
        </div>
      </v-col>
    </v-row>

  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "StandingsRanked.vue",
  components: {
    draggable,
  },
  data() {
    return {
      players: [],
      rankings: null,
    }
  },
  created() {
    this.initializeData();
  },
  methods: {
    initializeData() {
      this.players = [...this.$store.state.record.players];
      // Create an array with an array for each player to start off with
      let rankingArray = [];
      for (let i = 0; i < this.players.length; i++) {
        rankingArray.push([this.players[i]]);        
      }
      this.rankings = rankingArray;
    }
  },
  watch: {
    rankings: {
      handler: function() {
        this.$store.commit("record/updateRecordRank", this.rankings);
      },
      deep: true,
    }
  }
}
</script>

<style scoped>

.draggable-section {
  min-height: 30px;
}

</style>