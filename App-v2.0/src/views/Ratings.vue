<template>
    <section class="ratings" ref="ratings">
    	<div class="ratings-content">
    		<div class="overview">
    			<div class="overview-left">
    				<h1>{{seller.score}}</h1>
    				<h2>综合评分</h2>
    				<p>高于周边高家{{seller.rankRate}}%</p>
    			</div>
    			<div class="overview-right">
    				<div class="star-box">
    					<span>服务态度</span>
    					<star :size="36" :score="seller.serviceScore"></star>
    					<label>{{seller.serviceScore}}%</label>
    				</div>
    				<div class="star-box">
    					<span>商品评分</span>
    					<star :size="36" :score="seller.foodScore"></star>
    					<label>{{seller.foodScore}}%</label>
    				</div>
    				<div class="star-box">
    					<span>送达时间</span>
    					<span class="time">平均 {{seller.deliveryTime}} 分钟！</span>
    				</div>
    			</div>
    		</div>
    		
    		<split></split>
    		
    		<evaluate :evaluate="ratings" :type="type" :cont="cont" v-on:type-select="_typeSelect" v-on:cont-toogle="_contToogle"></evaluate>
    	
    		<div class="assess-box">
    			<ul>
    				<li class="assess-list" v-for="i in ratings" :key="i.rateTime" v-show="needShwo(i.rateType, i.text)">
    					<div class="user-photo">
    						<img :src="i.avatar" width="28px" height="28px" />
    					</div>
    					<div class="assess-content">
    						<h1>{{i.username}}</h1>
    						<div class="star-item">
    							<star :size="36" :score="seller.serviceScore"></star>
    							<span>{{i.deliveryTime}}分钟送达</span>
    						</div>
    						<p>{{i.text}}</p>
    						<div class="recommend">
    							<i class="iconfont icon-appreciatefill"></i>
    							<span v-for="j in i.recommend">{{j}}</span>
    						</div>
    						<span class="date">{{i.rateTime | formatDate}}</span>
    					</div>
    				</li>
    			</ul>
    		</div>
    	
    	</div>

    </section>
</template>

<script>
    import BScroll from 'better-scroll';
	import star from '@/components/Store/Star';
	import split from '@/components/Store/Split';
	import evaluate from '@/components/Store/Evaluate';

    import {FormatDate} from '@/utils/format.js';
	
	const ERROR = 0;
    const ALLSTIVE = 2;
    
    export default {
        name: 'Ratings',
        props: {
    		seller: {
    			type: Object
    		}
        },
        components: {
            star, split, evaluate
        },
        filters: {
			formatDate(time) {
				//return FormatDate(time, 'yyyy年MM月dd日 hh时mm分ss秒');
				return FormatDate(time, 'yyyy-MM-dd hh:mm:ss');
			}
		},
        data() {
            return {
                ratings: [],
                show: false,
				type: ALLSTIVE,
				cont: true
            }
        },
        mounted () {
            this.initDate();
        },
        methods: {
            async initDate() {
                this.ratings = await this.$.http({
                    url: "/ratings",
                    method: "GET",
                    data: {
                        uid: '002'
                    },
                });
                //异步更新dom结构
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.srcoll = new BScroll(this.$refs.ratings, {
                            click: true
                        })
                    } else {
                        this.scroll.refresh();
                    }
                });
            },

            showball () {
                this.show = !this.show;
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
        
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .ratings
    	position: absolute; top: 166px; left: 0px; bottom: 0px; width: 100%; overflow: hidden;
    	.overview
    		display: flex; padding: 18px 0px;
    		.overview-left
    			flex: 0 0 120px; width: 120px; padding: 6px 0px; text-align: center; border-right: 1px solid rgba(7, 17, 27, 0.2);
    			@media oonly screen and (max-width: 320px)
    				flex: 0 0 100px; width: 100px;
    			& > h1
    				margin-bottom: 6px; font-size: 24px; line-height: 28px; color: rgb(255, 135, 0);
    			& > h2
    				margin-bottom: 6px; font-size: 12px; line-height: 12px; color: rgb(7, 17, 27);
    			& > p
    				font-size: 10px; line-height: 10px; color: rgba(7, 17, 27, 0.5);
    		.overview-right
    			flex: 1; padding: 6px 0px 6px 24px; text-align: left;
    			@media oonly screen and (max-width: 320px)
    				padding-left: 8px;
    			.star-box
    				line-height: 18px; font-size: 0px; 
    				& > span
    					font-size: 12px; vertical-align: top; color: rgb(7, 17, 27);
    				.star
    					display: inline-block; margin: 0px 12px; vertical-align: top;
    				& > label
    					font-size: 12px; vertical-align: top; color: rgb(255, 135, 0);
    				.time
    					margin: 0px 12px; font-size: 12px; vertical-align: top; color: rgb(147, 153, 159);
    	.assess-box
    		padding: 0px 18px; text-align: left;
    		.assess-list
    			display: flex; padding: 18px 0px; border-bottom: 1px solid rgba(7, 17, 27, 0.2);
    			.user-photo
    				flex: 28px 0 0; width: 28px; margin-right: 12px;
    				& > img
    					display: block; border-radius: 50%;
    			.assess-content
    				flex: 1; position: relative;
    				& > h1
    					margin-bottom: 4px; font-size: 10px; line-height: 12px; color: rgb(7, 17, 27);
    				.star-item
    					margin-bottom: 6px; font-size: 0px;
    					.star
    						display: inline-block; margin-right: 6px; vertical-align: top;
    					& > span
    						font-size: 12px; line-height: 12px; vertical-align: top; font-weight: 200; color: rgb(147, 153, 159);
    				& > p
    					margin-bottom: 8px; font-size: 12px; line-height: 18px; color: rgb(7, 17, 27);
    				.recommend
    					line-height: 16px;
    					& > i
    						display: inline-block; margin: 0px 8px 4px 0px; font-size: 16px;
    						&.icon-appreciatefill
    							color: #00c850;
    						&.icon-thumb_down
    							color: #f01414; 
    					& > span
    						display: inline-block; margin: 0px 8px 6px 0px; padding: 0px 6px; line-height: 16px; font-size: 10px; vertical-align: top; color: rgb(147, 153, 159); border-radius: 2px; border: 1px solid rgba(7, 17, 27, 0.2);
					.date
						position: absolute; top: 0px; right: 0px; font-size: 12px; line-height: 12px; vertical-align: top; font-weight: 200; color: rgb(147, 153, 159);
</style>
