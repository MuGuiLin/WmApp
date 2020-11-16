<template>
  <div class="mine">
    <div class="avatar">
      <img class="logo" alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div class="setup">
      <h1 class="h1">{{ title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mine",
  components: {},
  data() {
    return {
      title: "个人中心",
    };
  },
  mounted() {},
  methods: {
    name() {},
  },
};
</script>

<style lang="stylus" scoped>
.mine {
  .avatar {
    margin: auto;
    padding: 10px;
    margin: 100px auto;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 1px solid gray;

    logo {
      width: 100%;
      height: 100%;
    }
  }

  .setup {
    h1.h1 {
      color: #666;
      font-size: 20px;
      text-align: center;
    }
  }
}
</style>
