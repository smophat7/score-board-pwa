<template>
  <MemberEdit v-if="ifShowEdit" @close-modal="modalClosed"/>
  <MemberStats v-else @close-modal="modalClosed"/>
</template>

<script>
export default {
  name: "MemberDetails",
  components: {
    MemberEdit: () => import("@/components/Members/MemberEdit.vue"),
    MemberStats: () => import('@/components/Members/MemberStats.vue')
  },
  computed: {
    ifShowEdit() {
      return this.$store.state.ifMemberEditComponent;
    },
  },
  methods: {
    modalClosed() {
      this.$store.commit("setIfMemberEditComponent", false);
      this.$emit('close-modal');
    },
  }
};
</script>