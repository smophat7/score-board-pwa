<template>
  <div>
    <StandingsPoints v-if="match(points)" />
    <StandingsRanked v-if="match(ranked)" />
    <StandingsCoop v-if="match(coop)" />
  </div>
</template>

<script>
export default {
  name: "DetermineStandings",
  components: {
    StandingsPoints: () => import("@/components/Record/StandingsPoints.vue"),
    StandingsRanked: () => import("@/components/Record/StandingsRanked.vue"),
    StandingsCoop: () => import("@/components/Record/StandingsCoop.vue"),
  },
  data() {
    return {
      points: this.$root.$data.enumGameType.POINTS.HIGH_WINS,       // default to high wins, user can change in StandinsPoints
      ranked: this.$root.$data.enumGameType.RANKED,
      coop: this.$root.$data.enumGameType.CO_OP,
    };
  },
  computed: {
    type() {
      return this.$store.state.recordGameType;
    }
  },
  methods: {
    match(desiredType) {
      return desiredType === this.type;
    },
  },
}
</script>