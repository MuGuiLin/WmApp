<template>
	<transition name="goods-info-move">
		<section ref="goodsInfoPage" v-show="showGoodsInfo" class="goods-info-page">
			<div class="info">
				<div class="info-header">
					<img :src="goods.image" :alt="goods.name" />
					<i @click="hideGoodsInfoFn" class="iconfont icon-pullleft"></i>
				</div>
				<div class="info-title">
					<h1>{{goods.name}}</h1>
					<p><span>月售{{goods.sellCount}}份</span><span>好评率{{goods.rating}}%</span></p>
					<div class="price">
						<span class="now-price">&yen;{{goods.price}}</span>
						<span class="old-price" v-show="goods.oldPrice">&yen;{{goods.oldPrice}}</span>
					</div>
					<div class="buyctrl-box">
						<buyctrl :foods="goods"></buyctrl>
					</div>
					<transition name="buy-move">
						<div @click.stop.prevent="addFirst" class="buy-btn" v-show="!goods.count || goods.count === 0">加入购物车</div>
					</transition>
				</div>
				<split></split>
				<div class="info-text">
					<h1>商品介绍</h1>
					<p v-if="goods.info">{{goods.info}}</p>
					<p v-else>商品信息更新中。。。！</p>
				</div>
				<split></split>
				<div class="info-evaluate">
					<h1>商品评价</h1>
					<evaluate :evaluate="goods.ratings" :type="type" :cont="cont" :desc="desc" v-on:type-select="_typeSelect" v-on:cont-toogle="_contToogle"></evaluate>
				</div>
				<div class="info-rating">
					<ul v-show="goods.ratings && goods.ratings.length">
						<li v-show="needShwo(o.rateType, o.text)" class="border-1px" v-for="(o, i) in goods.ratings" :key="i">
							<div class="user">
								<span>{{o.username}}</span>
								<img :src="o.avatar" width="18px" height="18px" />
							</div>
							<div class="time">
								{{o.rateTime | formatDate}}
							</div>
							<div class="text">
								<i :class="{'icon-thumb_up': o.rateType === 0, 'icon-thumb_down': o.rateType === 1}"></i>
								<span v-if="o.text">{{o.text}}</span>
								<span v-else>
									<label v-if="o.rateType === 0">这哥门不错，虽然什么也没说，至少点了个赞！</label>
									<label v-else>这家伙很懒，差评吧就也算了，还原因都没说！</label>
								</span>
							</div>
						</li>
					</ul>
					<div class="no-ratings" v-show="!goods.ratings || !goods.ratings.length">暂无评价！</div>
				</div>
			</div>
		</section>
	</transition>
</template>

<script type="text/ecmascript-6">
	import Vue from 'vue';
	import BScroll from 'better-scroll';
	import buyctrl from '@/components/Store/Buyctrl';
	import split from '@/components/Store/Split';
	import evaluate from '@/components/Store/Evaluate';
	import {FormatDate} from '@/utils/format.js';

	const ALLSTIVE = 2;
	
	export default {
		name: 'GoodsInfo',
		components: {
			buyctrl, split, evaluate
		},
		data(){
			return {
				'showGoodsInfo': false,
				'goods': {},
				'type': ALLSTIVE,
				'cont': false,
				'desc': {
					allstive: '全部',
					positive: '推荐',
					neagtive: '吐槽'
				}
			}
		},
		filters: {
			formatDate(time) {
				//return FormatDate(time, 'yyyy年MM月dd日 hh时mm分ss秒');
				return FormatDate(time, 'yyyy-MM-dd hh:mm:ss');
			},
			formatRmb(){
				
			}
		},
		methods: {
			showGoodsInfoFn(goodsData) {
				this.type = ALLSTIVE;
				this.cont = false;
				this.goods = goodsData;
				this.showGoodsInfo = true;
				
				//异步更新dom结构
				this.$nextTick(() => {
					if (!this.scroll) {
						this.srcoll = new BScroll(this.$refs.goodsInfoPage, {
							click: true
						})
					} else {
						this.scroll.refresh();
					}
				});
			},
			hideGoodsInfoFn() {
				this.showGoodsInfo = false;
			},
			
			//加入购物车
			addFirst(event) {
				if (!event._constructed) {
					return; //如果是通过BScroll插件生成的事件是不向下执行了(不然会同时执行两次)
				}
				
				Vue.set(this.goods, 'count', 1);
				
				this.$emit('puls-btn', event.target); //分发$emit分发事件(小球起飞的位置)
			},
			
			//商品评价类型内容显示过滤
			needShwo(type, text) {
				if (this.cont && !text) {
					return false;
				}
				if (this.type === ALLSTIVE) {
					return true;
				} else {
					return type === this.type;
				}
			},
			
			//监听子组件evaluate
			_typeSelect(type) {
				this.type = type;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			},
			
			//监听子组件evaluate
			_contToogle(cont) {
				this.cont = cont;
				this.$nextTick(() => {
					this.scroll.refresh();
				});
			}
		},
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.goods-info-page
		position: fixed; top: 0px; left: 0px; bottom: 49px; width: 100%; background: #fff;
		&.goods-info-move-enter-active
			animation: bounce-inA 1s;  
		&.goods-info-move-leave-active
			animation: bounce-outB 1s;
		.info-header
			position: relative; width: 100%; height: 0px; padding-top: 100%; /*这种写法：保持始终是一个正方形*/
			& > img
				position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;
			& > i
				position: absolute; top: 12px; left: 12px; display: block; font-size: 36px; color: gainsboro; text-align: center; border-radius: 50%;
		.info-title
			padding: 18px; position: relative;
			& > h1
				font-size: 14px; line-height: 28px; font-weight: 700; color: rgb(7, 17, 27);
			& > p
				font-size: 10px; line-height: 20px; color: rgb(147, 153, 159);
				& > span
					margin-right: 12px;
			.price
				line-height: 24px; font-weight: 800; padding-top: 18px;
				.now-price
					margin-right: 8px; line-height: 16px; font-size: 16px; color: rgb(240, 20, 20);
				.old-price
					line-height: 10px; font-size: 10px; color: rgb(147, 153, 159); text-decoration: line-through;
			.buyctrl-box
				position: absolute; right: 12px; bottom: 12px;
			.buy-btn
				position: absolute; right: 18px; bottom: 18px;  height: 24px; line-height: 24px; padding: 0px 12px; font-size: 12px; color: white; z-index: 10; border-radius: 12px; background-color: #00c500;	
				&.buy-move-enter-active, &.buy-move-leave-active {
				  transition: opacity .5s
				}
				&.buy-move-enter, &.buy-move-leave-to /* .fade-leave-active in below version 2.1.8 */ {
				  opacity: 0
				}
		.info-text
			padding: 18px; position: relative;
			& > h1
				margin-bottom: 6px; font-size: 14px; line-height: 28px; font-weight: 500; color: rgb(7, 17, 27);
			& > p
				padding: 0px 8px; font-size: 12px; text-align: justify; line-height: 24px; color: rgb(77, 85, 93);
		.info-evaluate
			padding-top: 18px;
			& > h1
				margin-left: 18px; font-size: 14px; line-height: 28px; font-weight: 500; color: rgb(7, 17, 27);
	
		.info-rating
			padding: 18px; padding-top: 0px;
			& > ul > li
				position: relative; padding: 16px 0px; border-bottom: 1px solid rgba(7, 17, 27, 0.2);
			.user
				position: absolute; top: 16px; right: 0px; line-height: 12px; font-size: 0px;
				& > span
					display: inline-block; margin-right: 6px; padding-top: 4px; vertical-align: top; font-size: 12px; color: rgb(147, 153, 159);
				& > img
					border-radius: 50%;
			.time
				margin-bottom: 6px; line-height: 12px; font-size: 12px; color: rgb(147, 153, 159);
			.text
				font-size: 12px; line-height:16px; color: rgb(7, 17, 27);
				& > i
					position: relative; top: 2px; margin-right: 4px; line-height: 24px; font-size: 16px;
					&.icon-thumb_up
						color: #00c850;
					&.icon-thumb_down
						color: #f01414; top: 4px;
			.no-ratings
				padding: 16px 0px; font-size: 12px; line-height:16px; color: #93879f;
					
	@keyframes bounce-inA {
		0% {
    		transform: translate3d(460px, 0px, 0px);
		}
		50% {
			transform: translate3d(-100px, 0px, 0px);
		}
		100% {
			transform: translate3d(0px, 0px, 0px);
		}
	}
	
	@keyframes bounce-outB {
		0% {
    		transform: translate3d(0px, 0px, 0px);
		}
		100% {
			transform: translate3d(460px, 0px, 0px);
		}
	}
</style>
