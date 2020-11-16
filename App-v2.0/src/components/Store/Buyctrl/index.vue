<template>
	<section class="buyctrl">
		<transition name="movetoleft">
			<div class="iconfont icon-roundclose" v-show="foods.count > 0" @click.stop.prevent="goodsLessFn($event)"></div>
		</transition>
		<div class="cont-num" v-show="foods.count > 0">{{foods.count}}</div>
		<div class="iconfont icon-roundaddfill" @click.stop.prevent="goodsPulsFn($event)"></div>
	</section>
</template>

<script type="text/ecmascript-6">
	import Vue from 'vue';
	
	export default {
		props: {
			foods: {
				type: Object
			}
		},
		mounted() {
//			console.log(this.foods);
		},
		methods: {
			
			//咸少商品数量
			goodsLessFn(event) {
				let ev = event || window.event;
				if (!ev._constructed) {
					return false; //如果是通过BScroll插件生成的事件是不向下执行了(不然会同时执行两次)
				}
				if (this.foods.count) {
					this.foods.count--;
				}
				
				//console.log(this.foods.count);
				this.$emit('less-btn', event.target); //在组件中，可以使用 $emit, $on(在标签上), $off 分别来分发、监听、取消监听事件
			},
			
			//增加商品数量
			goodsPulsFn(event) {
				let ev = event || window.event;
				if (!ev._constructed) {
					return false; //如果是通过BScroll插件生成的事件是不向下执行了(不然会同时执行两次)
				}
				
				//设置对象的属性 如果count不存在，就动态给当前设一个属性(Vue.set(object key value) //动态改变数据源) 
				if (!this.foods.count) {
					Vue.set(this.foods, 'count', 1); //object key value  这里至关重要：这是判断购买哪个商品的条件（就是当哪个商品被点击了，就给这个商品对应的数所对象（goods > foods > [某个商品]）的最后面添加一个count属性：如：count: 1）
				} else {
					this.foods.count++;
				}
				
				//console.log(this.foods.count);
				this.$emit('puls-btn', event.target); //分发$emit分发事件(小球起飞的位置)
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../../assets/stylus/mixins.styl";
	.buyctrl
		font-size: 0px;
		.icon-roundclose, .icon-roundaddfill
			display: inline-block; padding: 6px; color: #00c500; font-size: 24px; line-height: 24px;
			&.movetoleft-enter-active {
			 	transition: all 0.4s linear;
			}
			&.movetoleft-leave-active {
			  	transition: all 0.4s linear;
			}
			&.movetoleft-enter, &.movetoleft-leave-active {
			  	opacity: 0; transform: translate3d(24px, 0, 0) rotate(270deg);
			}
		.cont-num
			display: inline-block; padding-top: 6px; font-size: 12px; line-height: 24px; color: rgb(147, 153, 159); vertical-align: top; text-align: center;
</style>
