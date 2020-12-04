<template>
  <v-card class="d-flex flex-column full-screen-modal">
    
    <v-card-title class="secondary headline">
      <div class="d-flex clickable-pointer" @click="backToStats">
        <!-- <v-btn icon color="white"> -->
          <v-icon color="white">mdi-arrow-left</v-icon>
        <!-- </v-btn> -->
        <div class="ml-2 white--text">
          Back to Details
        </div>
      </div>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-form v-on:submit.prevent="updateMember">
          <v-text-field label="First Name" v-model="firstName" required></v-text-field>
          <v-text-field label="Last Name" v-model="lastName" required></v-text-field>
          <v-btn color="success" type="submit" block :disabled="!allFieldsFilled">Save Changes</v-btn>
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
  name: "MemberEdit",
  props: {
    member: Object,
  },
  data() {
    return {
      firstName: this.member.firstName,
      lastName: this.member.lastName,
    };
  },
  computed: {
    allFieldsFilled() {
      return (this.firstName !== "" && this.lastName !== "");
    }
  },
  methods: {
    async updateMember() {
      console.log("about to try query");
      let newMemberVersion = new Object({
        firstName: this.firstName,
        lastName: this.lastName,
      });
      let url = "http://localhost:3000/members/" + this.member.id;
      try {
        let response = await axios.put(url, newMemberVersion);
        console.log("Finished query");
      }
      catch (error) {
        console.log(error);
      }
      this.firstName = "";
      this.lastName = "";
      this.$store.commit('setIfGroupChanged', true);
    },
    backToStats() {
      console.log("backToStats");
      this.$store.commit('setIfMemberEditComponent', false);
    },
  },
}
</script>

<style scoped>
.full-screen-modal {
  height: 100%;
}

.clickable-pointer {
  cursor: pointer;
}
</style>