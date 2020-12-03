<template>
  <v-card class="d-flex flex-column">
    
    <v-card-title class="secondary headline">
      <div class="white--text">
        New Group Member
      </div>
    </v-card-title>

    <v-card-text>
      <v-form v-on:submit.prevent="addMember">
        <v-text-field label="First Name" v-model="firstName" required></v-text-field>
        <v-text-field label="Last Name" v-model="lastName" required></v-text-field>
        <v-btn color="success" type="submit" block :disabled="!allFieldsFilled">Add to Group</v-btn>
      </v-form>
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
        profilePicture: "default-profile.jpg",       // EDIT to supply individualized URL or picture data
      });
      let url = "http://localhost:3000/members";
      try {
        let response = await axios.post(url, newMember);
      }
      catch (error) {
        console.log(error);
      }
      this.firstName = "";
      this.lastName = "";
      this.$emit("added-member");
    },
  },
};
</script>