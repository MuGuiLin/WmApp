<template>
  <div class="home">
    <div class="shop-box">
      <router-link to="store">
        <div class="shop-item" v-for="(o, i) in shop" :key="i">
          <div class="image">
            <img class="timg" :src="o.timg" alt="" srcset="" />
          </div>
          <div class="store">
            <h3 class="name">{{ o.name }}</h3>
            <p class="score">{{ o.score }}分</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
const timg = require("../assets/timg.jpg");
export default {
  name: "Home",
  components: {},
  data() {
    return {
      shop: [
        {
          name: "聚香居（酒仙一品香）",
          timg: timg,
          score: 4.5,
        },
        {
          name: "聚香居（酒仙一品香）",
          timg: timg,
          score: 4.5,
        },
        {
          name: "聚香居（酒仙一品香）",
          timg: timg,
          score: 4.5,
        },
        {
          name: "聚香居（酒仙一品香）",
          timg: timg,
          score: 4.5,
        },
        {
          name: "聚香居（酒仙一品香）",
          timg: timg,
          score: 4.5,
        },
        {
          name: "聚香居（酒仙一品香）",
          timg: timg,
          score: 4.5,
        },
      ],
    };
  },
  mounted() {

  },
  methods: {
    name() {

    },
  },
};
</script>

<style lang="stylus" scoped>
@import '../assets/stylus/mixins.styl';

.home {
  .shop-box {
    padding-bottom: 100px;

    .shop-item {
      display: flex;
      margin: 26px 16px;

      .image {
        .timg {
          box-sizing: border-box;
          padding: 4px;
          width: 100px;
          height: 98px;
          border-radius: 8px;
          border: 1px solid rgba(0, 80, 0, 0.2);
        }
      }

      .store {
        flex: 1;
        margin-left: 5px;
        padding-left: 5px;
        border-1px(rgba(7, 17, 27, 0.2));

        h3.name {
          color: #555;
          line-height: 30px;
          font-weight: bold;
        }

        p.score {
          color: #008000;
        }
      }
    }
  }
}
</style>
