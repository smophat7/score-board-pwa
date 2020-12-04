<template>
  <div>
    <!-- <div v-if="ifShowEdit"> -->
      <MemberEdit v-if="ifShowEdit" :member="member" @close-modal="modalClosed"/>
    <!-- </div> -->
    <!-- <div v-else> -->
      <MemberStats v-else :member="member" @close-modal="modalClosed"/>
    <!-- </div> -->
  </div>
  
</template>

<script>
import axios from "axios";

// import MemberStats from "@/components/MemberStats.vue"
// import MemberEdit from "@/components/MemberEdit.vue"

export default {
  name: "MemberDetails",
  props: {
    member: Object,
  },
  components: {
    MemberEdit: () => import("@/components/MemberEdit.vue"),
    MemberStats: () => import('@/components/MemberStats.vue')
  },
  // data() {
  //   return {
  //     ifShowEdit: this.$store.state.ifMemberEditComponent,
  //   };
  // },
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