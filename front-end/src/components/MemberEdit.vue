<template>
  <v-card class="d-flex flex-column full-screen-modal">
    
    <v-card-title class="secondary headline">
      <div class="d-flex clickable-pointer" @click="backToStats">
        <v-icon color="white">mdi-arrow-left</v-icon>
        <div class="ml-2 white--text">
          Back to Details
        </div>
      </div>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-form v-on:submit.prevent="updateMember">
          <v-text-field label="First Name" v-model="firstName" autofocus required></v-text-field>
          <v-text-field label="Last Name" v-model="lastName" required></v-text-field>
          <v-btn v-if="updateLoading" color="success" block>
            <v-progress-circular small v-if="updateLoading" class="mr-2"
            indeterminate
            color="white"
            ></v-progress-circular>
            Saving Changes
          </v-btn>
          <v-btn v-else color="success" type="submit" block :disabled="!somethingDifferent">Save Changes</v-btn>
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
      memberLocal: this.member,
      firstName: this.member.firstName,
      lastName: this.member.lastName,
      updateLoading: false,
    };
  },
  computed: {
    somethingDifferent() {
      return (this.firstName !== this.memberLocal.firstName || this.lastName !== this.memberLocal.lastName);
    },
  },
  methods: {
    async updateMember() {
      this.updateLoading = true;
      let newMemberVersion = new Object({
        firstName: this.firstName,
        lastName: this.lastName,
      });
      let url = "/api/members/" + this.member.id;
      try {
        let response = await axios.put(url, newMemberVersion);
        this.memberLocal = response.data;
      }
      catch (error) {
        console.log(error);
      }
      this.firstName = this.memberLocal.firstName,
      this.lastName = this.memberLocal.lastName,
      this.$store.commit('setIfGroupChanged', true);
      this.updateLoading = false;
    },
    backToStats() {
      this.$store.commit('setIfMemberEditComponent', false);
    },
  },
}
</script>

<style scoped>
/* .full-screen-modal {
  height: 100%;
} */

.clickable-pointer {
  cursor: pointer;
}
</style>