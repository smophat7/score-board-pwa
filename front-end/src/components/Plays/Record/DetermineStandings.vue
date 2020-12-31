<template>
  <div>
    <StandingsPoints v-if="match(pointsHigh) || match(pointsLow)" />
    <StandingsRanked v-if="match(ranked)" />
    <StandingsCoop v-if="match(coop)" />
  </div>
</template>

<script>
export default {
  name: "DetermineStandings",
  components: {
    StandingsPoints: () => import("@/components/Plays/Record/StandingsPoints.vue"),
    StandingsRanked: () => import("@/components/Plays/Record/StandingsRanked.vue"),
    StandingsCoop: () => import("@/components/Plays/Record/StandingsCoop.vue"),
  },
  data() {
    return {
      pointsHigh: this.$root.$data.enumGameType.POINTS.HIGH_WINS,       // default to high wins, user can change in StandingsPoints
      pointsLow: this.$root.$data.enumGameType.POINTS.LOW_WINS,         // default to high wins, but still needs to "match" and be visible if the user changes it to low in the next step
      ranked: this.$root.$data.enumGameType.RANKED,
      coop: this.$root.$data.enumGameType.CO_OP,
    };
  },
  computed: {
    type() {
      return this.$store.state.record.recordGameType;
    }
  },
  methods: {
    match(desiredType) {
      return desiredType === this.type;
    },
  },
}
</script>