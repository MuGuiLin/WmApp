<template>
	<div class="header">
		<section class="background-box">
			<img :src="seller.avatarbg" width="96%"/>
		</section>
		
		<section class="content-box">
			<div class="photo">
				<img v-bind:src="seller.avatar" width="64px" height="64px" />
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<p class="time">{{seller.description}}/{{seller.deliveryTime}}分钟内送达！</p>
				<div v-if="seller.supports" class="supports">
					<span class="type" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="supports-btn" @click="showDetail()">
				<span v-text="">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</section>
		
		<section class="bulletin-box" @click="showDetail()">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</section>
		
		<transition name="bounce">
			<section v-show="detailShow" class="pop-detail" ref="popDetail">
				<div class="detail-box clear">
					<div class="detail-main">
						<h1>{{seller.name}}</h1>
						<div class="star-box">
							<star :size="48" :score="seller.score"></star>
						</div>
						
						<flex detail-text="优惠信息"></flex>
						
						<ul class="supports">
							<li v-for="(i, index) in seller.supports"><i :class="classMap[seller.supports[index].type]"></i>{{i.description}}</li>
						</ul>
						
						<flex detail-text="商家公告"></flex>
						
						<p class="bulletin">{{seller.bulletin}}</p>
					</div>
				</div>
				<div class="detail-close">
					<i class="icon-close" @click="hideDetail()"></i>
				</div>
			</section>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import star from '@/components/star/star.vue';
	import flex from '@/components/flex/flex.vue';
	
	export default {
		props: {
			seller: {
				type: Object  //接收App.vue传过来的数据对象
			}
		},
		data() {
			return {
				detailShow: false
			}	
		},
		mounted() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; //这里根据后端传过来的数据中的seller下的supports组数，对应着下面的class属性 背景样式
			this.$nextTick(() => {
				this._initScroll();
			});
		},
		methods: {
			showDetail() {
				this.detailShow = true;
			},
			hideDetail() {
				this.detailShow = false;
			},
			_initScroll() {
				this.typeScroll = new BScroll(this.$refs.popDetail, {
					click: true
				});
			}
		},
		components: {
			star,  //注册传过的的组件，这样就可以在 template 标签下的任意地方使用了
			flex
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixins.styl"
	.header
		position: relative; color: white; background-color: #e6e2e1; overflow: hidden;
		.background-box
			position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; text-align: center; overflow: hidden; filter: blur(4px);
		.content-box
			position: relative; padding: 16px 12px 18px 14px; font-size: 0px;
			.photo
				display: inline-block; vertical-align: top; background-color: white; border-radius: 2px;
				& > img
					border-radius: 2px;
			.content
				display: inline-block; margin-left: 16px;
				.title
					margin: 2px 0px 8px 0px;
					.brand
						width:30px; height: 18px; display: inline-block; vertical-align: top; bg-image("img/brand"); background-size: 30px 18px; background-repeat: no-repeat;
					.name
						margin-left: 6px; font-size: 16px; font-weight: bold; line-height: 18px;
				.time
					margin-bottom: 10px; font-size: 12px; line-height: 12px;
				.supports
					.type
						display: inline-block; width: 12px; height: 12px; vertical-align: top; margin-right: 4px; background-size: 12px 12px; background-repeat: no-repeat;
						&.decrease
							bg-image("img/decrease_1");
						&.discount
							bg-image("img/discount_1");
						&.special
							bg-image("img/special_1");
						&.invoice
							bg-image("img/invoice_1");
						&.guarantee
							bg-image("img/guarantee_1");
					.text
						line-height: 12px; font-size: 10px;
			.supports-btn
				position: absolute; right: 14px; bottom: 18px; height: 24px; line-height: 24px; padding: 0px 8px; text-align: center; border-radius:14px; background-color: rgba(0, 0, 0, 0.2);
				& > span
					display: inline-block; font-size: 10px;
				& > i
					display: inline-block; width:10px; height: 10px; vertical-align: center; margin-left: 2px; font-size: 10px;
					.icon-keyboard_arrow_right
						font-size: 10px; line-height: 24px;
		.bulletin-box
			position: relative; height: 28px; line-height: 28px; padding: 0px 22px 0px 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; background-color: rgba(7, 17, 27, 0.2);
			.bulletin-title
				display: inline-block; margin-top: 9px; width: 22px; height: 12px; vertical-align: top; background-size: 22px 12px; bg-image("img/bulletin"); background-repeat: no-repeat;
			.bulletin-text
				font-size: 10px; vertical-align: top; margin: 0px 4px 0px 0px;
			.icon-keyboard_arrow_right
				position: absolute; top: 8px; right: 12px; font-size: 10px;
		.pop-detail
			position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; z-index: 999; background-color: rgba(7, 17, 27, 0.8);
			&.bounce-enter-active
				animation: bounce-inA 1s;  
			&.bounce-leave-active
				animation: bounce-outB 1s; 
			.detail-box
				width: 100%; min-height: 100%;
				.detail-main
					padding: 36px 36px 64px 36px;
					& > h1
						width: 100%; font-size: 16px; line-height: 16px; font-weight: 700; text-align: center; color: white;
					.star-box
						margin-top: 18px; padding 2px 0px; text-align: center;
					.supports
						& > li
							font-size: 12px; line-height: 16px; font-weight: 200;
							& > i
								display: inline-block; margin: 0px 6px 12px 12px; width: 16px; height: 16px; vertical-align: top; background-size: 16px 16px; background-repeat: no-repeat;
								&.decrease
									bg-image("img/decrease_2");
								&.discount
									bg-image("img/discount_2");
								&.special
									bg-image("img/special_2");
								&.invoice
									bg-image("img/invoice_2");
								&.guarantee
									bg-image("img/guarantee_2");
					.bulletin
						font-size: 12px; line-height: 24px; font-weight: 200; text-align: justify;
		.detail-close
			position: relative; width: 32px; height: 32px; margin: -64px auto 0px auto; font-size: 32px; clear: both; 
	
	@keyframes bounce-in {
	  	0% {
	  		/*opacity: 0;*/
	  		/*filter: blur(4px);*/
	  		background-color: rgba(7, 17, 27, 0);
	    	/*transform: scale(0);*/
	    	/*transform: translate3d(0px, 500px, 0px);*/
	    	transform: translate3d(460px, 0px, 0px);
	  	}
	  	100% {
	  		/*opacity: 1;*/
	  		filter: blur(0px);
	  		background-color: rgba(7, 17, 27, 0.8);
	   		/*transform: scale(1);*/
	   		/*transform: translate3d(0px, 0px, 0px);*/
	    	transform: translate3d(0px, 0px, 0px);
	  	}
	}
	
	@keyframes bounce-out {
		0% {
			/*filter: blur(0px);*/
			background-color: rgba(7, 17, 27, 0.8);
		    /*transform: scale(1);*/
		    /*transform: translate3d(0px, 0px, 0px);*/
		   transform: translate3d(0px, 0px, 0px);
		}
		100% {
			/*filter: blur(4px);*/
			background-color: rgba(7, 17, 27, 0);
			/*transform: scale(0);*/
			/*transform: translate3d(0px, 500px, 0px);*/
			transform: translate3d(460px, 0px, 0px);
		}
	}
		
	@keyframes bounce-inA {
		0% {
			background-color: rgba(7, 17, 27, 0);
    		/*transform: scale(0);*/
    		transform: translate3d(460px, 0px, 0px);
		}
		50% {
			/*transform: scale(1.5);*/
			transform: translate3d(-100px, 0px, 0px);
		}
		100% {
			background-color: rgba(7, 17, 27, 0.8);
			/*transform: scale(1);*/
			transform: translate3d(0px, 0px, 0px);
		}
	}
	
	@keyframes bounce-outB {
		0% {
			background-color: rgba(7, 17, 27, 0.8);
    		/*transform: scale(1);*/
    		transform: translate3d(0px, 0px, 0px);
		}
		50% {
			/*transform: scale(1.5);*/
			transform: translate3d(-100px, 0px, 0px);
		}
		100% {
			background-color: rgba(7, 17, 27, 0);
			/*transform: scale(0);*/
			transform: translate3d(460px, 0px, 0px);
		}
	}
</style>
