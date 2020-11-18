<template>
  <div class="home">
    <div class="shop-box">
      <div class="shop-item" v-for="(o, i) in shop" :key="i">
        <router-link
          class="link"
          :to="{ path: '/store', query: { id: o.mtWmPoiId } }"
        >
          <div class="image">
            <img class="timg" :src="o.picUrl" alt="" srcset="" />
          </div>
          <div class="store">
            <h3 class="name">{{ o.shopName }}</h3>
            <p class="score">
              <label class="star">
                <i
                  class="iconfont icon-favorfill"
                  v-for="(o, i) in Math.round(o.wmPoiScore / 10)"
                  :key="i"
                ></i>
              </label>
              {{ o.wmPoiScore / 10 }}分
            </p>
            <ul class="disc">
              <li v-for="(o, i) in o.discounts2" :key="i" v-show="i < 2">
                <img :src="o.iconUrl" :alt="o.promotionType" />
                <span>{{ o.info }}</span>
              </li>
            </ul>
          </div>
        </router-link>
      </div>
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
      shop: [],
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    async getdata() {
      this.shop = await this.$.http({
        url: "/shop",
        method: "GET",
        data: this.params,
      });
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
      .link {
        display: flex;
        overflow: hidden;
        margin: 26px 16px;

        .image {
          .timg {
            box-sizing: border-box;
            padding: 4px;
            width: 80px;
            height: 78px;
            border-radius: 8px;
            border: 1px solid rgba(0, 80, 0, 0.2);
          }
        }

        .store {
          flex: 1;
          margin-left: 5px;
          padding-left: 5px;
          padding-bottom: 10px;
          border-1px(rgba(7, 17, 27, 0.2));

          h3.name {
            padding-bottom: 10px;
            width: 80%;
            color: #555;
            font-size: 15px;
            font-weight: bold;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          p.score {
            font-size: 14px;
            color: #008000;

            .star {
              i {
                font-size: 13px;
                color: #fbbc00;
              }
            }
          }

          ul.disc {
            li {
              display: -webkit-flex;
              display: flex;
              -webkit-align-items: center;
              align-items: center;
              margin-top: 8px;

              img {
                width: 15px;
                height: 15px;
                margin-right: 5px;
              }

              span {
                width: 90%;
                color: #666;
                font-size: 11px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
