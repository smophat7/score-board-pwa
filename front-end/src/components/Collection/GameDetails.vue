<template>
  <!-- <GameEdit v-if="ifShowEdit" :game="game" @close-modal="modalClosed"/> -->
  <GameEdit v-if="ifShowEdit" @close-modal="modalClosed"/>
  <!-- <GameStats v-else :game="game" @close-modal="modalClosed"/> -->
  <GameStats v-else @close-modal="modalClosed"/>
</template>

<script>
export default {
  name: "GameDetails",
  components: {
    GameEdit: () => import("@/components/Collection/GameEdit.vue"),
    GameStats: () => import('@/components/Collection/GameStats.vue')
  },
  computed: {
    ifShowEdit() {
      return this.$store.state.ifGameEditComponent;
    },
  },
  methods: {
    modalClosed() {
      this.$store.commit("setIfGameEditComponent", false);
      this.$emit('close-modal');
    },
  }
};
</script>
