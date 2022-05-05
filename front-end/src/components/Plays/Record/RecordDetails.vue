<template>
  <div>
    <h2>Game Details</h2>
    <p>Just gotta add some last minute details and then you're done.</p>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="6" class="text-center">
          <h3 class="text-left mb-3">When did you play?</h3>
          <v-date-picker v-model="datePlayed"  full-width color="secondary" class="float-left"></v-date-picker>
        </v-col>
        <v-col cols="12" sm="6">
          <h3 class="mb-3">Description (optional)</h3>
          <v-textarea
          v-model="description"
          placeholder="What happened? Somebody flip the table? Were there really good snacks? Did the game last 6 hours? Add vital details or fun facts."
          auto-grow
          outlined
          clearable
          rows="13"
        ></v-textarea>
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
      this.$store.commit("record/updateRecordDescription", this.description);
    },
    datePlayed: {
      immediate: true,
      handler() {
        this.$store.commit("record/updateRecordDate", this.datePlayed);
      }
    },
  }
}
</script>