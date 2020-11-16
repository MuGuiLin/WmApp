<template>
	<section class="seller" ref="sellerdom">
		<div class="seller-content">
			<div class="head-view">
				<h1>{{seller.name}}</h1>
				<div class="desc">
					<star :size="36" :score="seller.score"></star>
					<label>({{seller.ratingCount}})</label>
					<span>月售{{seller.sellCount}}单</span>
				</div>
				<ul class="rmb-time">
					<li class="list">
						<h2>起送价格</h2>
						<div class="block">
							{{seller.minPrice}}
							<span>元</span>
						</div>
					</li>
					<li class="list">
						<h2>商家配送</h2>
						<div class="block">
							{{seller.deliveryPrice}}
							<span>元</span>
						</div>
					</li>
					<li class="list">
						<h2>配送时间</h2>
						<div class="block">
							{{seller.deliveryTime}}
							<span>分钟</span>
						</div>
					</li>
				</ul>
				<transition name="star-move">
					<div class="favorite" @click="favoriteFn">
						<i class="icon-favorite" :class="favor ? 'favor' : 'nofavor'"></i>
						<span>{{collect}}</span>
					</div>
				</transition>
			</div>
			
			<split></split>
			
			<div class="bulletin">
				<h1>公告与活动</h1>
				<div class="content">
					<p>{{seller.bulletin}}</p>
				</div>
				<ul class="supports">
					<li v-for="(i, index) in seller.supports" :key="index"><i class="icon" :class="classMap[seller.supports[index].type]"></i>{{i.description}}</li>
				</ul>
			</div>
			
			<split></split>
			
			<div class="trade-view">
				<h1>商家实景</h1>
				<div class="trade-box" ref="tradebox">
					<ul ref="tradeul">
						<li class="list" v-for="i in seller.pics"><img :src="i"/></li>
					</ul>
				</div>
			</div>
			
			<split></split>
			
			<div class="trade-info">
				<h1>商家信息</h1>
				<ul class="ul">
					<li class="list" v-for="i in seller.infos">{{i}}</li>
				</ul>
			</div>
		</div>
		<div class="menu-pop">
	        <button class="show-menu" @click="showMenu" >{{text}}</button>
	        <transition name="menu-move">
	            <ul class="menu-box" v-show="show">
	                <li class="inner inner-1">1</li>
	                <li class="inner inner-2">2</li>
	                <li class="inner inner-3">3</li>
	                <li class="inner inner-4">4</li>
	                <li class="inner inner-5">5</li>
	            </ul>
	        </transition>
		</div>
	</section>
    
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import star from '@/components/star/star.vue';
	import split from '@/components/split/split.vue';
	
	const ERROR = 0;
	
    export default {
    	props: {
    		
    	},
        data () {
            return {
            	seller: [],
            	favor: true,
                show: false
            };
        },
        mounted() {
			this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']; //这里根据后端传过来的数据中的seller下的supports组数，对应着下面的class属性 背景样式
			this.$http.get('/api/seller', 'uid: "003"').then((data) => {
				if (ERROR === data.body.erron) {
					this.seller = data.body.data;
					this.$refs.tradeul.style.width = 188 * this.seller.pics.length + 'px';
					this.$nextTick(() => {
						if (!this.scroll) {
							this.srcoll = new BScroll(this.$refs.tradebox, {
								scrollX: 'true',
								eventPassthrough: 'vertical'
							});
							
							this.srcoll = new BScroll(this.$refs.sellerdom, {
								click: true
							});
						} else {
							this.scroll.refresh();
						}
					});
				}
			});
		},
        methods: {
        	favoriteFn() {
        		this.favor = !this.favor;
        	},
            showMenu () {
                this.show = !this.show;
            }
        },
        computed: {
        	collect () {
                return this.favor ? '已收藏' : '未收藏';
           	},
           
            text () {
                return this.show ? 'OFF' : 'ON';
            }
        },
        components: {
        	star, split
        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
 	@import "../../common/stylus/mixins.styl"
 	
    .seller
    	position: absolute; top: 166px; left: 0px; bottom: 0px; width: 100%; overflow: hidden;
    	.head-view
    		padding: 18px;
    		& > h1
    			margin-bottom: 10px; line-height: 16px; font-size: 16px; color: rgb(7, 17, 27);
    		.desc
    			padding-bottom: 18px; font-size: 0px; border-bottom: 1px solid rgba(7, 17, 27, 0.2);
    			.star
    				display: inline-block; margin-right: 8px; vertical-align: top;
    			& > label, span
    				display: inline-block; vertical-align: top; line-height: 18px; font-size: 12px; color: rgb(77, 85, 93);
    			& > label
    				margin-right: 12px;
    		.rmb-time
    			display: flex; padding-top: 18px;
    			.list
    				flex: 1; text-align: center; border-right: 1px solid rgba(7, 17, 27, 0.2);
    				&:last-child
    					border: none;
    				& > h2
    					margin-bottom: 8px; line-height: 14px; font-size: 14px; color: rgb(147, 153, 159);
    				.block
    					line-height: 24px; font-size: 24px; color: rgb(7, 17, 27); font-weight: 300;
    					& > span
    						font-size: 10px;
    		.favorite
    			position: absolute; top: 18px; right:18px; text-align: center; transition-delay: all 1s;
    			&.star-move-enter-active
    			  	transform: translate3d(0, 0, 0); 
    			&.star-move-enter, &.star-move-leave-active
	                    transition-timing-function: ease-in-out;
	                    transform: translate3d(0, 60px, 0); transition-delay: all .5s;
    			/*&.star-move-enter-active
					animation: move-in 1s;  
				&.star-move-leave-active
					animation: move-out 1s;*/
    			.icon-favorite
    				display: block;
    			.favor
    				font-size: 28px; line-height: 28px; color: rgb(240, 20, 20);
    			.nofavor
    				font-size: 28px; line-height: 28px; color: rgb(147, 153, 159);
    			& > span
    				line-height: 14px; font-size: 14px; color: rgb(7, 17, 27);
    	.bulletin
    		padding: 18px 18px 0px 18px;
    		& > h1
    			margin-bottom: 10px; line-height: 16px; font-size: 16px; color: rgb(7, 17, 27);
    		.content
    			padding: 0px 12px 16px 12px; border-bottom: 1px solid rgba(7, 17, 27, 0.2);
    			& > p
    				text-align: justify; line-height: 24px; font-size: 12px; color: rgb(240, 20, 20);
    		.supports
    			& > li
    				padding: 18px 12px; line-height: 24px; font-size: 12px; border-bottom: 1px solid rgba(7, 17, 27, 0.2);
	    			&:last-child
	    				border: none;
					.icon
						display: inline-block; width: 16px; height: 16px; vertical-align: middle; margin-right: 6px; background-size: 16px 16px; background-repeat: no-repeat;
						&.decrease
							bg-image("img/decrease_4");
						&.discount
							bg-image("img/discount_4");
						&.special
							bg-image("img/special_4");
						&.invoice
							bg-image("img/invoice_4");
						&.guarantee
							bg-image("img/guarantee_4");
		 .trade-info
	    	padding: 18px;
			& > h1
    			margin-bottom: 16px; line-height: 16px; font-size: 16px; color: rgb(7, 17, 27);
			.ul
    			.list
    				padding: 20px 12px; font-size: 14px; line-height: 18px; color: #00a0dc; border-top: 1px solid rgba(7, 17, 27, 0.2);
    	.menu-pop
	        .show-menu
	            position: fixed; bottom: 60px; right: 10px; z-index: 10; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; border: none; outline: none; color: #fff; font-size: 18px; background: #00a0dc;
	        .menu-box
	            position: fixed; bottom: 60px; right: 10px; width: 50px; height: 50px; border-radius: 50%; transition: all .7s ease-in;
	            .inner
	                display: inline-block; position: absolute; width: 30px; height: 30px; line-height: 30px;border-radius: 50%; background: #00c850 ;text-align: center; color: #fff; transition: all .4s;
	            .inner-1
	                top: -50px; left: 10px;
	            .inner-2
	                left: -30px; top: -30px;
	            .inner-3
	                left: -50px; top: 10px;
	            .inner-4
	                left: -30px; top: 50px;
	            .inner-5
	                left: 10px; top: 70px;
	            &.menu-move-enter-active
	                .inner
	                    transform: translate3d(0, 0, 0); transition-timing-function: cubic-bezier(0, .57, .44, 1.97);
	                .inner-1
	                    transition-delay: .1s;
	                .inner-2
	                    transition-delay: .2s;
	                .inner-3
	                    transition-delay: .3s;
	                .inner-4
	                    transition-delay: .4s;
	                .inner-5
	                    transition-delay: .5s;
	            &.menu-move-enter, &.menu-move-leave-active
	                .inner
	                    transition-timing-function: ease-in-out;
	                .inner-1
	                    transform: translate3d(0, 60px, 0); transition-delay: .5s;
	                .inner-2
	                    transform: translate3d(40px, 40px, 0); transition-delay: .4s;
	                .inner-3
	                    transform: translate3d(60px, 0, 0); transition-delay: .3s;
	                .inner-4
	                    transform: translate3d(40px, -40px, 0); transition-delay: .2s;
	                .inner-5
	                    transform: translate3d(0px, -70px, 0); transition-delay: .1s;
	  	.trade-view
			padding: 18px 0px 18px 18px;
			& > h1
    			margin-bottom: 12px; line-height: 16px; font-size: 16px; color: rgb(7, 17, 27);
    		.trade-box
    			width: 96%; overflow: hidden; white-space: nowrap;
    			& > ul
    				overflow: auto;
	    			& > li
	    				display: inline-block; margin-right: 6px;
						img{
							height: 300px;
						}
	    				
	@keyframes move-in {
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
	
	@keyframes move-out {
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
