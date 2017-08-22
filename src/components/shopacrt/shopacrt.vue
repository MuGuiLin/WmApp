<template>
	<section class="shopacrt">
		<div class="content-bot">
			<div class="shopacrt-box"></div>
		</div>
		<div class="content-top" @click="toggleList">
			<div class="shopacrt-box">
				<div class="shop-car">
					<i class="icon-shopping_cart" :class="{'count-yes' : goodsCount > 0}"></i>
					<span class="goods-count" v-show="goodsCount > 0">{{goodsCount}}</span>
				</div>
				<div class="total-price" :class="totalPrice > 0 ? 'price-yes' : ''">&yen;{{totalPrice}}元</div>
				<div class="delivery-fee">另需配送费 &yen;{{deliveryRmb}}元</div>
			</div>
			<div class="settlement-box" @click.stop="pay" :class="{'send-yes' : totalPrice >= tosendRmb}" v-html="toSendFn"></div>
		</div>
		<div class="balls-box">
			<transition-group tag="ul" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:after-enter="afterEnter">
				<li v-for="i in balls" :key="i" class="ball" v-show="i.show">
					<i class="plus-btn icon-add_circle inner"></i>
				</li>	
			</transition-group>
		</div>
		<transition name="shopacrt-list-move">
			<div class="shopacrt-list" v-show="listShow">
				<div class="list-header">
					<h2>购物车</h2>
					<button @click="emptyList">清空</button>
				</div>
				<div class="list-content" ref="shopacrtList">
					<ul>
						<li v-for="i in selectGoods" class="list barder-1px">
							<span class="name">{{i.name}}</span>
							<span class="price">&yen;{{i.price}}</span>
							<buyctrl :foods="i"></buyctrl>
						</li>
					</ul>
				</div>
			</div>
		</transition>
		<section class="pop-mask" v-show="listShow" @click="toggleList"></section>
	</section>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import buyctrl from '@/components/buyctrl/buyctrl.vue';
	export default {
		props: {

			//接收商品名称 , 商品价格 , 商品数量
			selectGoods: {
				type: Array,
				default() {
					return [
//						{
//							price: 1.6,
//							count: 3
//						},
//						{
//							price: 8,
//							count: 8
//						}
					];
				}
			},
			
			//接收商品配送费
			deliveryRmb: {
				type: Number,
				default: 0
			},
			
			//接收商品起送费
			tosendRmb: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				
				//按扭动画小球
				balls: [
					{
						'show': false
					},
					{
						'show': false
					},
					{
						'show': false
					},
					{
						'show': false
					},
					{
						'show': false
					}
				],
				
				//存放已点击过的动画小球，（因为动画结束后，又要将show设为false）
				dropBalls: [],
				
				//显示或隐藏购物车列表
				fold: false
			}
		},
		computed: {
			
			//计算所选商品总价
			totalPrice() {
				let price = 0;
				//循环上面接收到的商品价格 和 商品数量 的数组
				this.selectGoods.forEach((goods) => {
					price += goods.price * goods.count; //总价 = 商品价格 * 商品数量
				});
				return price;
			},
			
			//计算所选商品数量
			goodsCount() {
				let count = 0;
				this.selectGoods.forEach((goods) => {
					count += goods.count;
				});
				return count;
			},
			
			//计算商品起送价
			toSendFn() {
				if (this.totalPrice < 1) {
					return `&yen;${this.tosendRmb}元起送`;
				} else if (this.totalPrice < this.tosendRmb) {
					return `还差&yen;${this.tosendRmb - this.totalPrice}元起送`;
				} else {
					return '去结算';
				}
			},
			
			listShow(){
				if (!this.goodsCount) {
					//如果没有商品数量时，购物车列表绝对隐藏
					this.fold = true;
					return false;
				} else {
					//如果有商品数量时，购物车列表是显示的则隐藏，是隐藏的则显示，
					let fold = !this.fold;
					if (fold) {
						this.$nextTick(() => {
							if (!this.scroll) {
								//给购物车列表添加（better-scroll插件）
								this.scroll = new BScroll(this.$refs.shopacrtList, {
									click: true
								});
							} else {
								this.scroll.refresh();
							}
						});
					}
					return fold;
				}
			}
		},
		mounted() {
			window.setTimeout(() => {
				//alert(this.deliveryRmb);
			}, 1000);
		},
		methods: {
			//当点击购买按扭 + 时（该方法被父组件调用）
			getPulsBtn(el) {
				console.log(el);
				for (let i = 0; i < this.balls.length; i++) {
					let ball = this.balls[i];
					if (!ball.show) {
						ball.show = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				};
			},
			//动画开始前
			beforeEnter(el) {
				console.log(el)
				let count = this.balls.length;
				while (count--) {
					let ball = this.balls[count];
					if (ball.show) {
						let bcr = ball.el.getBoundingClientRect(); //方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离。
						let x = bcr.left - 26;
						let y = -(window.innerHeight - bcr.top - 52);
						
						el.style.display = ''; 
						
						//设置动画小球的起点位置，（在被点击那个购买按扭的位置）
						el.style.transform = `translate3d(0, ${y}px, 0)`;
						el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
						
						let inner = el.querySelectorAll('.inner')[0];
						inner.style.transform = `translate3d(${x}px, 0, 0)`;
						inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
					}
				}
			},
			//动画开始中
			enter(el, done) {
				/* eslint-disable no-unused-vars */
				let refresh = el.offsetHeight; //重绘高度
				this.$nextTick(() => {
					//设置动画小球从起点位置，恢复到原先的位置上（通过CSS中的 transition 和 cubic-bezier 就有动画了）
					el.style.transform = 'translate3d(0, 0, 0)';
					el.style.webkitTransform = 'translate3d(0, 0, 0)';
					
					let inner = el.querySelectorAll('.inner')[0];
					inner.style.transform = 'translate3d(0, 0, 0)';
					inner.style.webkitTransform = 'translate3d(0, 0, 0)';
				});
				done();
			},
			//动画开始后
			afterEnter(el) {
				let ball = this.dropBalls.shift();
				if (ball) {
					ball.show = false;

					window.setTimeout(function(){
						el.style.display = 'none';
					}, 400);
				}
			},
			//弹出购物车
			toggleList() {
				//点击购物车时： 判断是否有购买数量（是否购买了商品）有则显示
				if (this.goodsCount) {
					this.fold = !this.fold; //购物车显示 / 隐藏 切换（提示是购买了商品）
				}
			},
			//清空购物车
			emptyList() {
				this.selectGoods.forEach((goods) => {
					goods.count = 0;
				});
			},
			//结算
			pay() {
				//只购买总价 大于 起送价时，才能结算
				if (this.totalPrice >= this.tosendRmb) {
					window.alert(`支付总价：¥${this.totalPrice} 元`);
					//window.location.href = './pay.html';
				}
			}
		},
		components: {
			buyctrl
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixins.styl";
	.shopacrt
		position: fixed; z-index: 48;
		.content-bot
			position: fixed; left: 0px; bottom: 0px; width: 100%; height: 48px; z-index: 100px;
			.shopacrt-box
				position: relative; top: -11px; width: 56px; height: 56px; border: 1px solid #00c500; border-radius: 50%; margin: 0px 11px;
		.content-top
			display: flex; position: fixed; left: 0px; bottom: 0px; width: 100%; height: 48px; color: rgba(255, 255, 255, 0.4); border-top: 1px solid #00c500; background-color: #141d27; z-index: 100px;
			.shopacrt-box
				flex: 1; font-size: 0px; 
				.shop-car
					display: inline-block; vertical-align: top; box-sizing: border-box; position: relative; top: -10px; width: 56px; height: 56px; border-radius: 50%; margin: 0px 12px; padding: 6px; background-color: #141d27;
					& > i
						display: inline-block; width: 100%; height: 100%; border-radius: 50%; color: green; background-color: #2b343c; text-align: center; font-size: 24px; line-height: 48px; 
					& > .count-yes
						background-color: #22affe; color: white; font-weight: 0px;
					.goods-count
						display: inline-block; position: absolute; top: 0px; right: 0px; height: 16px; padding: 0px 5.5px; text-align: center; border-radius: 16px; line-height:16px; font-size: 9px; font-weight: 700; color: white; background-color: rgb(240, 20, 20); box-shadow: 0px 2px 4px 0px rgb(0, 0, 0, 0.4);
				.total-price
					display: inline-block; vertical-align: top; box-sizing: border-box; margin-top: 12px; padding-right: 12px; line-height: 24px; font-size: 16px; font-weight: 700; border-right: 1px solid rgba(255, 255, 255, 0.1); 
					&.price-yes
						color: white;
				.delivery-fee
					display: inline-block; vertical-align: top; box-sizing: border-box; margin-top: 12px; margin-left: 12px; line-height: 24px; font-size: 10px; font-weight: 400;
					
			.settlement-box
				flex: 0 0 108px; width: 108px; line-height: 48px; font-size: 14px; font-weight: 700; text-align: center; background-color: #2b333b;
				&.send-yes
					background-color: #00c500; color: white;
		.balls-box
			.ball
				position: fixed; left: 32px; bottom: 22px; z-index: 999; transition: all 0.4s cubic-bezier(.52,-0.64,.77,.52);
				.inner
					display: inline-block; font-size: 24px; color: #009cf3; border-radius: 50%; transition: all 0.4s linear;
		.shopacrt-list
			position: fixed; left: 0px; bottom: 48px; width: 100%; z-index:-1;
			&.shopacrt-list-move-enter-active{
				transition: all 0.6s; 
			}
			&.shopacrt-list-move-leave-active{
				transition: all 0.6s;
			}
			&.shopacrt-list-move-enter, &.shopacrt-list-move-leave-active{
				transform: translate3d(0, 100%, 0);
			}
			.list-header
				display: flex; line-height: 40px; padding: 0px 18px; background: #f3f5f7; border-bottom: 2px solid rgba(7, 17, 27, 0.1);
				& > h2
					flex: 1; font-size: 14px; color: #00a0dc; font-weight: 600;
				& > button
					flex: 60px 0 0; margin-top: 8px; width: 60px; height: 24px; font-size: 12px; border: 1px solid rgb(0, 160, 220); color: rgb(0, 160, 220); border-radius: 24px; background: white;
			.list-content
				padding: 0px 18px; max-height: 218px; background: white; overflow: hidden;
				.list
					padding: 16px 0; border-1px(rgba(7, 17, 27, 0.2));
					.name
						line-height: 24px; font-size: 14px; color: rgb(7, 17, 27);
					.price
						position: absolute; right: 100px; bottom: 16px; line-height: 24px; font-size: 14px; text-align: left; color: rgb(240, 20, 20); font-weight: 700;
					.buyctrl
						position: absolute; right: -6px; bottom: 10px; 
		.pop-mask
			position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; transition: all 0.6s; background: rgba(0, 0, 0, 0.8); backdrop-folter: blur(10px); z-index: -2;
</style>
