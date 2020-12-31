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
          <v-btn v-if="loadingUpdate" color="success" block>
            <v-progress-circular small v-if="loadingUpdate" class="mr-2"
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
  data() {
    return {
      memberLocal: null,
      firstName: "",
      lastName: "",
    };
  },
  created() {
    this.memberLocal = this.member,
    this.firstName = this.member.firstName;
    this.lastName = this.member.lastName;
  },
  computed: {
    member() { return this.$store.getters["members/detailMember"]; },
    loadingUpdate() { return this.$store.state.members.loadingUpdate },
    somethingDifferent() {
      return (this.firstName !== this.memberLocal.firstName || this.lastName !== this.memberLocal.lastName);
    },
  },
  methods: {
    async updateMember() {
      let newMemberVersion = new Object({
        firstName: this.firstName,
        lastName: this.lastName,
      });
      await this.$store.dispatch("members/update", {
        currentMemberId: this.member.id,
        updatedMember: newMemberVersion
      });
      this.memberLocal = this.member;
    },
    backToStats() {
      this.$store.commit('setIfMemberEditComponent', false);
    },
  },
}
</script>

<style scoped>

.clickable-pointer {
  cursor: pointer;
}
</style>