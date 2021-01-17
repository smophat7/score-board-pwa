<template>
  <v-card class="d-flex flex-column">

    <v-card-title class="secondary headline">
      <div class="white--text">
        New Group Member
      </div>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-form v-on:submit.prevent="addMember">
          <v-text-field label="First Name" v-model="firstName" autofocus required></v-text-field>
          <v-text-field label="Last Name" v-model="lastName" required></v-text-field>
          <v-btn color="success" type="submit" block :disabled="!allFieldsFilled">Add to Group</v-btn>
        </v-form>
      </v-container>
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
import axios from "axios";

export default {
  name: "AddNewMember",
  data() {
    return {
      firstName: "",
      lastName: "",
    };
  },
  computed: {
    allFieldsFilled() {
      return (this.firstName !== "" && this.lastName !== "");
    }
  },
  methods: {
    async addMember() {
      let newMember = new Object({
        firstName: this.firstName,
        lastName: this.lastName,
        profilePicture: "default-profile.jpg",        // EDIT to supply individualized URL or picture data
      });
      await this.$store.dispatch("members/addToCurrentGroup", newMember);
      await this.$store.dispatch("members/fetch");
      // await this.$store.dispatch("groups/addMemberToGroup", this.$store.state.members.newlyAddedMember);
      this.firstName = "",
      this.lastName = "",
      this.$emit("close-modal");
    }
  },
};
</script>