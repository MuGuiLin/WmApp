<template>
  <div class="store">
    <v-header :seller="seller"></v-header>
    <v-nav />
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import Nav from "@/components/Store/Nav";
import Header from "@/components/Store/Header";

export default {
  name: "Store",
  components: {
    "v-nav": Nav, //接收引用外为组件模块,
    "v-header": Header,
  },
  data() {
    return {
      seller: {},
      params: {
        page: 1,
        number: 20,
      },
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    async getdata() {
      this.seller = await this.$.http({
        url: "/seller",
        method: "GET",
        data: this.params,
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixins.styl';
</style>