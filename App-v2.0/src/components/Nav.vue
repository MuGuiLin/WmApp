<template>
  <footer class="footer">
    <nav class="nav">
      <!-- <router-link class="link" to="/home">
        <i class="iconfont icon-goods"></i>
        <b class="name">外卖</b>
      </router-link>
      <router-link class="link" to="/order">
        <i class="iconfont icon-shop"></i>
        <b class="name">订单</b>
      </router-link>
      <router-link class="link" to="/mine">
        <i class="iconfont icon-my"></i>
        <b class="name">我的</b>
      </router-link> -->

      <router-link
        class="link"
        v-for="(o, i) in menu"
        :key="i"
        @click="switchTo(o.path)"
        :to="o.path"
      >
        <i class="iconfont" :class=" o.path === $route.path ? menu[i].active + ' active' : menu[i].icon " ></i>
        <b class="name" :class="o.path === $route.path ? ' active' : ''">{{
          o.name
        }}</b>
      </router-link>
    </nav>
  </footer>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      menu: [
        {
          icon: "icon-goods",
          active: "icon-goodsfill",

          name: "外卖",
          path: "/home",
        },
        {
          icon: "icon-shop",
          active: "icon-shopfill",
          name: "订单",
          path: "/order",
        },
        {
          icon: "icon-my",
          active: "icon-myfill",
          name: "我的",
          path: "/mine",
        },
      ],
    };
  },
  methods: {
    switchTo: function (path) {
      this.$router.replace(path);
    },
  },
};
</script>

<style lang="stylus" scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  border: 1px solid rgba(7, 17, 17, 0.1);
  background: white;

  .nav {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 100%;

    .link {
      display: flex;
      flex: 1;
      text-decoration: none;
      justify-content: center;
      align-items: center;
      color: #666;
      flex-direction: column;

      .iconfont {
        font-weight: bold;
        font-size: 22px;
      }

      .name {
        line-height: 20px;
        font-size: 14px;
        font-weight: normal;
      }

      .active {
        color: #008000;
        font-weight: bold;
      }
    }
  }
}
</style>