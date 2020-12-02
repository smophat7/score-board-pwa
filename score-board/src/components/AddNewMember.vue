<template>
  <v-card class="d-flex flex-column">
    
    <v-card-title class="secondary headline">
      <div class="white--text">
        New Group Member
      </div>
    </v-card-title>

    <v-card-text>
      <h4 class="my-5">This is where the content of this form and such will go.</h4>
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
  name: "AddNewMember",
  data() {
    return {  };
  },
  computed: {  },
  methods: {  },
};
</script>