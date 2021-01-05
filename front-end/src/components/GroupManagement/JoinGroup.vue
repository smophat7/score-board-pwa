<template>
  <v-card class="d-flex flex-column">

    <v-card-title class="secondary headline">
      <div class="text-truncate white--text">
        Join Group
      </div>
      <v-spacer></v-spacer>
    </v-card-title>

    <v-card-text>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-form v-on:submit.prevent="joinGroup">
            <p>Members of the group you would like to join can provide you with the group's join code. They can see this by going to the "Group" page and clicking "Invite".</p>
            <v-text-field v-model="joinCodeInput" label="Join Code" required></v-text-field>
            <p class="red--text">{{ error }}</p>
            <v-btn color="success" type="submit">Join</v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>

    <v-spacer></v-spacer>
    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn block color="error" text @click="$emit('close-modal')">
        <v-icon left color="error">mdi-close-circle</v-icon>
        Close
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "JoinGroup",
  data() {
    return {
      joinCodeInput: "",
    }
  },
  computed: {
    error() { return this.$store.state.groups.addByJoinCodeError; }
  },
  methods: {
    async joinGroup() {
      await this.$store.dispatch("groups/addMemberToGroupByJoinCode", this.joinCodeInput);
      await this.$store.dispatch("groups/fetch");
    },
    closeModal() {
      this.$store.dispatch("groups/changeShowJoinGroup", false);
    },
  },
}
</script>