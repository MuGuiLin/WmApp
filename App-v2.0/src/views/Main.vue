<template>
  <div>
    <router-view />
    <v-nav/>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
export default {
  components: {
    "v-nav": Nav,
  },
};
</script>

<style lang="stylus" scoped></style>