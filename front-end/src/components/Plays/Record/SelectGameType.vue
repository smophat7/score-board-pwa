<template>
  <div>
    <h2>Select Game Type</h2>
    <p>Did you keep score or was it more of a 1st, 2nd, 3rd situation?</p>
      <v-btn-toggle v-model="selection">
        <v-btn>Points</v-btn>
        <v-btn>Ranked</v-btn>
        <!-- <v-btn>Co-op</v-btn> -->
      </v-btn-toggle>
  </div>
</template>

<script>
export default {
  name: "SelectGameType",
  data() {
    return {
      // points: this.$root.$data.enumGameType.POINTS.HIGH_WINS,       // default to high wins, user can change in points assignment step
      // ranked: this.$root.$data.enumGameType.RANKED,
      // coop: this.$root.$data.enumGameType.CO_OP,
      // selected: this.$store.state.recordGameType,
      selection: null,
    };
  },
  methods: {
    makeSelection(typeNum) {
      let enumType = "";
      switch (typeNum) {
        case 0:
          enumType = this.$root.$data.enumGameType.POINTS.HIGH_WINS;
          this.$store.commit("record/updateRecordGameType", enumType);
          break;
        case 1:
          enumType = this.$root.$data.enumGameType.RANKED;
          this.$store.commit("record/updateRecordGameType", enumType);
          break;
        case 2:
          enumType = this.$root.$data.enumGameType.CO_OP;
          this.$store.commit("record/updateRecordGameType", enumType);
          break;
        default:
          break;
      }
    },
    // removeSelection() {
    //   this.selected = "";
    // },
    // printReadable(type) {
    //   switch (type) {
    //     case this.$root.$data.enumGameType.POINTS.HIGH_WINS:
    //       return "Points";
    //     case this.$root.$data.enumGameType.RANKED:
    //       return "Ranked";
    //     case this.$root.$data.enumGameType.CO_OP:
    //       return "Co-op";
    //   }
    // },
  },
  watch: {
    // selected() {
    //   this.$store.commit("updateRecordGameType", this.selected);
    //   if (this.selected === "") {
    //     this.$store.commit("changeRecordStep", 3);
    //   }
    //   else {
    //     this.$store.commit("changeRecordStep", 4);
    //   }
    // },
    selection: {
      immediate: true,
      handler: function() {
        this.makeSelection(this.selection);
        // if (this.selection === null) {
        //   this.$store.commit("changeRecordStep", 3);
        // }
        // else {
        //   this.$store.commit("changeRecordStep", 4);
        // }
      },
    },
  },
}
</script>