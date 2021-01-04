<template>
  <div>
    <v-form v-on:submit.prevent="joinGroup">
      <p>Input group join code here:</p>
      <v-text-field v-model="joinCodeInput" label="Join Code" required></v-text-field>
      <v-btn color="success" type="submit">Join</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "JoinGroup",
  data() {
    return {
      joinCodeInput: "",
    }
  },
  computed: { },
  methods: {
    async joinGroup() {
      await this.$store.dispatch("groups/addMemberToGroupByJoinCode", this.joinCodeInput);
    },
  },
}
</script>