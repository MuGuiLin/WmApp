<template>
  <div class="store">
    <v-header :header="header" :seller="seller"></v-header>
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
      header: {},
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

      const header = await this.$.http({
        url: "/shop",
        method: "GET",
        data: { id: this.$route.query.id },
      });
      this.header = header.filter((o) => o.mtWmPoiId == this.$route.query.id)[0];
      console.log(this.header);
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixins.styl';
</style>