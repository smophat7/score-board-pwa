<template>
  <div>
    <h2>Game Details</h2>
    <v-container>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="6">
          <h3 class="mb-3">Add a description for this play</h3>
          <v-textarea
          v-model="description"
          label="Description (optional)"
          auto-grow
          outlined
          clearable
          rows="5"
        ></v-textarea>
        </v-col>
        <v-col cols="12" sm="6" class="text-center">
          <h3 class="text-left mb-3">When did you play?</h3>
          <v-date-picker v-model="datePlayed" color="secondary" full-width></v-date-picker>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "RecordDetails",
  data() {
    return {
      description: "",
      datePlayed: new Date().toISOString().substr(0, 10),
    }
  },
  watch: {
    description() {
      this.$store.commit("updateRecordDescription", this.description);
    },
    datePlayed: {
      immediate: true,
      handler() {
        this.$store.commit("updateRecordDate", this.datePlayed);
      }
    },
  }
}
</script>