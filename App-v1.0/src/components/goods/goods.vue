<template>
	<div class="goods">
		<section class="goods-type" ref="goodsType">
			<ul>
				<li v-for="(i, index) in goods" class="menu-list border-1px" :key="index" @click="_goodsTyptBtn(index, $event)" :class="{'activation': index === computeListH1}">
					<span class="name" :class="i.type > 1 ? 'txt-left' : ''">
						<i v-show="i.type > 1" class="icon" :class="classMap[i.type]"></i>{{i.name}}
					</span>	
				</li>
			</ul>
		</section>
		
		<section class="goods-list" ref="goodsList">
			<ul>
				<li v-for="(i, index) in goods" :key="index" class="list-box">
					<h1 class="title">{{i.name}}</h1>
					<ul>
						<li v-for="(j, index) in i.foods" :key="index" @click="openGoodsInfo(j, $event)" class="foods-box border-1px">
							<div class="goods-icon">
								<img :src="j.icon" :alt="j.name" width="58" height="58px"/>
							</div>
							<div class="goods-info">
								<h2 class="name">{{j.name}}</h2>
								<p class="desc">{{j.description}}</p>
								<div class="sell">
									<span class="count">月售{{j.sellCount}}份</span>
									<span>好评率{{j.rating}}%</span>
								</div>
								<div class="price">
									<span class="now-price">&yen;{{j.price}}</span>
									<span class="old-price" v-show="j.oldPrice">&yen;{{j.oldPrice}}</span>
								</div>
								<div class="ctrl-box">
									<buyctrl :foods="j" v-on:less-btn="_goodsLessFn" v-on:puls-btn="_goodsPulsFn"></buyctrl>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</section>
		
		<shopacrt ref="shopacrt" :select-goods="selectGoods" :delivery-rmb="seller.deliveryPrice" :tosend-rmb="seller.minPrice"></shopacrt>
		
		<goodsinfo ref="goodsinfo"></goodsinfo>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import shopacrt from '@/components/shopacrt/shopacrt.vue';
	import buyctrl from '@/components/buyctrl/buyctrl.vue';
	import goodsinfo from '@/components/goods_info/info.vue';
	
	const ERROR = 0;
	export default {
		'props': {
			'seller': {
				'type': Object
			}
		},
		data() {
			return {
				'goods': {}, //商品数据列表
				'listHeight': [], //商品列表各类型（h1标签）的高度
				'scrollY': 0  //商品列表的滚动位置
			}
		},
		'computed': {
			computeListH1(){
				for (let i = 0; i < this.listHeight.length; i++) {
					let listHeightA = this.listHeight[i];
					let listHeightB = this.listHeight[i + 1];
					
					if (!listHeightB || (this.scrollY >= listHeightA && this.scrollY < listHeightB)) {
						return i; //左侧菜单 和 右侧列表 滚动对应的区间位置
					}
				}
				return 0;
			},
			//计算提取所有被购买的商品（当数据源被改变时，selectGoods()会自动执行，这就是vue中 computed 计算属性的好处） 
			selectGoods() {
				let foods = [];
				//循环上面的goods商品数据列表
				0 < this.goods.length && this.goods.forEach((goodsData) => {
					//console.log(JSON.stringify(goodsData));
					//在循环goods商品数据列表里面的foods数组项
					goodsData.foods.forEach((foodsData) => {
						//console.log(JSON.stringify(foodsData));
						if (foodsData.count) {
							foods.push(foodsData); //如果点击某个商品对应的加减按时（当数据源发生变化时（goods > foods > [某个商品] 添加了count属性时）），（buyctrl.vue）会给该商品添加一个count属性, 此时在这个计算方法里循环判断count属性存在时，就保存foods[]数组中。
						}
					})
				});
				//console.log(foods);
				return foods; //将被购买（加减按扭操作）的商品传给（shopacrt.vue）去计算商品数量，价格，总价。 
			}
		},
		mounted() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
			this.$http.get('/api/goods', 'uid: "001"').then((data) => {
				if (ERROR === data.body.erron) {
					this.goods = data.body.data;
					this.$nextTick(() => {
						//Vue 异步执行 DOM 更新 延时执行
						this._initScroll();
						this._scrollList();
					})
				}
				console.log(this.goods);
			});
		},
		'methods': {
			
			//监听子组件buyctrl标签上绑定对自定义事件：less-btn 商品减按扭
			_goodsLessFn(target) {
				console.log(target) //这样就可以取到子组件向父组件传过来的参数啦！
			},
			
			//监听子组件buyctrl标签上绑定对自定义事件：plus-btn 商品加按扭
			_goodsPulsFn(target) {
				this.$refs.shopacrt.getPulsBtn(target); //父组件在子组件shopacrt的标签上绑定ref="shopacrt"，这样通过$refs.shopacrt调用shopacrt子组件中的getPulsBtn()方法，并且把参数也传过去啦！
			},
			
			//初始化scroll插件
			_initScroll() {
				//BScroll方法（better-scroll插件提供）
				this.typeScroll = new BScroll(this.$refs.goodsType, {
					click: true //开启该元素对象下面的点击事件（被包在里面的元素）
				});
				
				this.listScroll = new BScroll(this.$refs.goodsList, {
					click: true, //开启该元素对象下面的点击事件（被包在里面的元素）
					probeType: 3 //https://github.com/ustbhuangyi/better-scroll	
				});
				
				//监听this.$refs.goodsList商品列表的滚动位置
				this.listScroll.on('scroll', (position) => {
					this.scrollY = Math.abs(Math.round(position.y)); //将滚动位置取整Math.round(去掉小数部分)，并取正整数Math.abs(去掉负数部分)
					console.log(this.scrollY);
				})
			},
			_scrollList() {
				let listBox = this.$refs.goodsList.querySelectorAll('.list-box');
//				alert(listBox.length);
				let height = 0;
				this.listHeight.push(height);
				
				for (let i = 0; i < listBox.length; i++) {
					height += listBox[i].clientHeight;
					this.listHeight.push(height);
				}
//				alert(this.listHeight);
			},
			_goodsTyptBtn(index, event) {
				let ev = event || window.event;
				if (!ev._constructed) {
					//如果是通过BScroll插件生成的事件是不向下执行了(不然会同时执行两次)
//					ev.preventDefault();
					return false;	
				}
//				alert(index);
				let listBox = this.$refs.goodsList.querySelectorAll('.list-box');
				this.listScroll.scrollToElement(listBox[index], 300)
			},
			_pulsBtn(target){
				this.$nextTick(() => {
					this.$refs.shopacrt.getPulsBtn(target);
				});
			},
			
			//打开商品详情
			openGoodsInfo(goods, event) {
				let ev = event || window.event;
				if (!ev._constructed) {
					return false; //如果是通过BScroll插件生成的事件是不向下执行了(不然会同时执行两次)
				}
				this.$refs.goodsinfo.showGoodsInfoFn(goods);
			}
		},
		'components': {
			shopacrt, buyctrl, goodsinfo
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixins.styl";
	.goods
		display: flex; position: absolute; top: 167px; left: 0px; right: 0px; bottom: 48px; overflow: hidden;
		.goods-type
			flex: 0px 0px 80px; width: 80px; height: 100%; background: #f3f5f7;
			.menu-list
				display: table; box-sizing: border-box;  width: 100%; height: 56px; line-height: 14px; text-align: center; border-1px(rgba(7, 17, 27, 0.2)); 
				&.activation
					background: white; color: #1393da; border-1px(#1393da); 
				.name
					display: table-cell; font-size: 12px; vertical-align: middle; padding: 0px 12px;
					&.txt-left
						text-align: left; padding-left: 14px;
					.icon
						display: inline-block; width: 12px; height: 12px; vertical-align: bottom; margin-right: 2px; background-size: 12px 12px; background-repeat: no-repeat;
						&.decrease
							bg-image("img/decrease_3");
						&.discount
							bg-image("img/discount_3");
						&.special
							bg-image("img/special_3");
						&.invoice
							bg-image("img/invoice_3");
						&.guarantee
							bg-image("img/guarantee_3");
		.goods-list
			flex: 1; height: 100%;
			.list-box
				.title
					margin: 0px; line-height: 26px; padding-left: 14px; font-size: 12px; border-left: 2px solid #d9dde1; color: rgb(147, 153, 159); background: #f3f2f7;
				.foods-box
					display: flex; margin: 18px; padding-bottom: 18px; border-1px(rgba(7, 17, 27, 0.2));
					&:last-child
						border-none(); padding-bottom: 0px;
					.goods-icon
						flex: 0 0 58px; margin-right: 10px;
						& > img
							border-radius: 2px;
					.goods-info
						flex: 1;
						.name
							margin: 2px 0px 8px 0px; line-height: 14px; font-size: 14px; color: $color;
						.desc, .sell
							margin: 8px 0px; line-height: 12px; font-size: 10px; color: rgb(147, 135, 159);
						.sell > .count
							margin-right: 12px;
						.price
							line-height: 24px; font-weight: 800;
							.now-price
								margin-right: 8px; line-height: 16px; font-size: 16px; color: rgb(240, 20, 20);
							.old-price
								line-height: 10px; font-size: 10px; color: rgb(147, 153, 159); text-decoration: line-through;
						.ctrl-box
							position: absolute; right: 0px; bottom: 12px;	
</style>
