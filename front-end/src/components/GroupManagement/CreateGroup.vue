<template>
  <v-card class="d-flex flex-column">

    <v-card-title class="secondary headline">
      <div class="text-truncate white--text">
        Create Group
      </div>
      <v-spacer></v-spacer>
    </v-card-title>

    <v-card-text>
      <v-row align="center" justify="center">
        <v-col cols="12">
          <v-form v-on:submit.prevent="createGroup">
            <p>To create a new group, all you need is a group name. ScoreBoard users can join the group later by entering the group's unique join code.</p>
            <v-text-field v-model="groupName" label="Group Name" required></v-text-field>
            <v-btn color="success" type="submit" :disabled="groupName == null || groupName == ''">
               <v-progress-circular small v-if="loadingSubmit" class="mr-2"
                indeterminate
                color="white"
                ></v-progress-circular>
              Create
            </v-btn>
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
  name: "CreateGroup",
  data() {
    return {
      groupName: "",
      loadingSubmit: false,
    }
  },
  methods: {
    async createGroup() {
      this.loadingSubmit = true;
      let newGroup = {
        name: this.groupName,
        date: new Date(),
        members: [this.$store.state.user.member.id],
        joinCode: Math.random().toString(36).substr(2, 8).toUpperCase(),            // Randomly generated all-caps alphanumeric string, 8-chars
      }
      await this.$store.dispatch("groups/add", newGroup);
      await this.$store.dispatch("groups/fetch");
      
      // Re-fetch everything (probably a way to specify only the active page, which would be better, just need to record that in state
      await this.$store.dispatch("members/fetch");
      await this.$store.dispatch("collection/fetch");
      await this.$store.dispatch("plays/fetch");
      
      this.loadingSubmit = false;
      this.$emit('close-modal');
    },
  },
}
</script>