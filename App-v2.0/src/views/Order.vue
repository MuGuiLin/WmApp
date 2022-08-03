<template>
  <div class="orders">

    <div class="container">
      <div class="list">
        <div class="itme" v-for="(item, index) in list" :key="index" :style="{ height: item }">
          <i class="iconfont icon-wangfill"></i>
          <h4 class="title">{{ index + 1 + '、' + title }}</h4>
        </div>
      </div>
      <nav class="nav">
        <a @click="jump(index)" :class="index == active ? 'active' : ''" v-for="(item, index) in list" :key="index">
          {{ index + 1 }}</a>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "Order",
  components: {},
  data() {
    return {
      title: "您最近没有订单哦！",
      active: 0,
      scroll: '',
      list: ["100vh", "150vh", "360vh", "200vh", "600vh", "50vh", "100vh"]
    };
  },
  watch: {
    scroll() {
      this.loadScroll();
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
    });
  },
  methods: {
    jump(index) {
      let jump = document.getElementsByClassName('itme');
      let total = jump[index].offsetTop;
      document.body.scrollTop = total;
      document.documentElement.scrollTop = total;
      window.pageYOffset = total;

      // $('html, body').animate({
      // 'scrollTop': total
      // }, 400);
    },
    loadScroll() {
      var itme = document.getElementsByClassName('itme');
      for (var i = itme.length - 1; i >= 0; i--) {
        if (this.scroll >= itme[i].offsetTop) {
          this.active = i
          break;
        }
      }
    }
  },
};
</script>

<style lang="stylus" scoped>
.orders {
  width: 100vw;
  height: 100vh;
  background: #eee;

  .itme {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100vw;
    background: #eee;
    border: 1px solid #008000;

    i.iconfont {
      font-size: 58px;
      color: #008000;
    }

    h4.title {
      font-size: 18px;
      color: #008000;
    }
  }


  .nav {
    position: fixed;
    top: 50%;
    right: 2px;
    transform: translateY(-55%);
    border: 1px solid #008000;
    border-radius: 4px;

    a {
      padding: 10px 10px;
      cursor: pointer;
      display: block;
    }

    a:hover {
      color: #008000;
    }

    a.active {
      font-size: 28px;
      font-weight: bold;
      color: white !important;
      border-top: 1px solid white;
      border-bottom: 1px solid white;
      background: #008000;
    }

  }
}
</style>
