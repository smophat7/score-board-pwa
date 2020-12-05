<template>
  <div>
    <h2>Select Game Type</h2>
    <v-container>
      <v-chip v-if="selected != ''" label close @click:close="removeSelection">
        {{ printReadable(selected) }}
      </v-chip>
    </v-container>

    <v-divider></v-divider>

    <v-list>
      <v-list-item v-if="selected != points" @click="makeSelection(points)" :key="points">
        <v-list-item-title>{{ printReadable(points) }}</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="selected != ranked" @click="makeSelection(ranked)" :key="ranked">
        <v-list-item-title>{{ printReadable(ranked) }}</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="selected != coop" @click="makeSelection(coop)" :key="coop">
        <v-list-item-title>{{ printReadable(coop) }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "SelectGameType",
  data() {
    return {
      points: this.$root.$data.enumGameType.POINTS.HIGH_WINS,       // default to high wins, user can change in points assignment step
      ranked: this.$root.$data.enumGameType.RANKED,
      coop: this.$root.$data.enumGameType.CO_OP,
      selected: this.$store.state.recordGameType,
    };
  },
  methods: {
    makeSelection(type) {
      this.selected = type;
    },
    removeSelection() {
      this.selected = "";
    },
    printReadable(type) {
      switch (type) {
        case this.$root.$data.enumGameType.POINTS.HIGH_WINS:
          return "Points";
        case this.$root.$data.enumGameType.RANKED:
          return "Ranked";
        case this.$root.$data.enumGameType.CO_OP:
          return "Co-op";
      }
    },
  },
  watch: {
    selected() {
      this.$store.commit("updateRecordGameType", this.selected);
      if (this.selected === "") {
        this.$store.commit("changeRecordStep", 3);
      }
      else {
        this.$store.commit("changeRecordStep", 4);
      }
    },
  },
}
</script>