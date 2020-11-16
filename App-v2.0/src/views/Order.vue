<template>
  <div class="orders">
    <i class="iconfont icon-wangfill"></i>
    <h4 class="title">{{ title }}</h4>
  </div>
</template>

<script>
export default {
  name: "Order",
  components: {},
  data() {
    return {
      title: "您最近没有订单哦！",
    };
  },
  mounted () {
    ;
  },
  methods: {
    name() {
      
    }
  },
};
</script>

<style lang="stylus" scoped>
.orders {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #eee;

  i.iconfont {
    font-size: 58px;
    color: #008000;
  }

  h4.title {
    font-size: 18px;
    color: #666666;
  }
}
</style>
