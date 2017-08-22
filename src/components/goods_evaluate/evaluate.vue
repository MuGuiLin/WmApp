<template>
	<section class="evaluate">
		<div class="type border-1px">
			<span @click="select(2, $event)" class="positive" :class="{'active': type === 2}">{{desc.allstive }}<label>{{evaluate.length}}</label></span>
			<span @click="select(0, $event)" class="positive" :class="{'active': type === 0}">{{desc.positive}}<label>{{positives.length}}</label></span>
			<span @click="select(1, $event)" class="neagtive" :class="{'active': type === 1}">{{desc.neagtive}}<label>{{negatives.length}}</label></span>
		</div>
		<div @click="toggle($event)" class="switch">
			<i class="icon-check_circle" :class="{'on': cont}"></i>
			<span>只看有内容的评价</span>
		</div>
	</section>
</template>

<script type="text/ecmascript-6">
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALLSTIVE = 2;
	
	export default {
		props: {
			evaluate: {
				type: Array,
				default() {
					return [];
				}
			},
			//接收选择类型
			type: {
				type: Number,
				default: ALLSTIVE
			},
			cont: {
				type: Boolean,
				default: false
			},
			//选收描述内容
			desc: {
				type: Object,
				default() {
					return {
						allstive: '全部',
						positive: '满意',
						neagtive: '不满意'
					}
				}
			}
			
		},
		computed: {
			positives() {
				return this.evaluate.filter((num) => { //filter是vue中的过滤器
					return num.rateType === POSITIVE;  //rateType是data.json中返回的数据
				});
			},
			negatives() {
				return this.evaluate.filter((num) => {
					return num.rateType === NEGATIVE;
				});
			}
		},
		methods: {
			//商品评价类型
			select(type, event) {
				if (!event._constructed) {
					return; //如果是通过BScroll插件生成的事件是不向下执行了(不然会同时执行两次)
				}
				this.type = type;
				this.$emit('type-select', type); 
			},
			
			//只看有内容评价切换
			toggle(event){
				if (!event._constructed) {
					return; //如果是通过BScroll插件生成的事件是不向下执行了(不然会同时执行两次)
				}
				this.cont = !this.cont;
				this.$emit('cont-toogle', this.cont); 
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixins.styl";
	
	.evaluate
		.type
			padding: 18px 0px; margin: 0px 18px; font-size: 0px; border-1px(rgba(7, 17, 17, 0.2));
			& > span
				display: inline-block; margin-right: 8px; padding: 8px 12px; font-size: 12px; border-radius: 1px; color: rgb(77, 85, 93);
				& > label
					font-size: 8px; margin-left: 2px;
			& > .positive
				background-color: rgba(0, 160, 220, 0.2);
				&.active
					color: white; background-color: rgb(0, 160, 220);
			& > .neagtive
				background-color: rgba(77, 85, 93, 0.2);
				&.active
					color: white; background-color: rgb(77, 85, 93);
		.switch
			padding: 12px 18px; line-height: 24px;  color: rgb(147, 135, 159); border-bottom: 1px solid rgba(7, 17, 27, 0.2);
			& > i
				display: inline-block; vertical-align: top; font-size:24px; 
				&.on
					color: #00c850;
			& > span
				display: inline-block; vertical-align: top; font-size: 12px;
</style>
