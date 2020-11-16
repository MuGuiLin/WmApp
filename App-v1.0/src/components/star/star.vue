<template>
	<div class="star" :class="starType">
		<i v-for="i in starData" class="star-item" :class="i"></i>
	</div>
</template>

<script type="text/ecmascript-6">
	const LENGTH = 5; //长度为5颗星
	const CLS_ON = 'on';
	const CLS_HALF = 'half';
	const CLS_OFF = 'off';
		  
	export default {
		props: {
			size: {
				type: Number  //接收传过来的数据
			},
			score: {
				type: Number
			}
		},
		computed: {
			starType() {
				return 'star-' + this.size;
			},
			starData() {
				let resust = [];
					//计算向下取整（0.5的倍数)的值
				let	score = Math.floor(this.score * 2) / 2;
					//取小数（半星状态），如果该结果不为0，那就说明是带有小数的值如：0.5, 1.5, 2.5, ...
				let	isDecimal = (score % 1) !== 0;
					//取整数（全星状态）
				let	isInteger = Math.floor(score);
				
				//将全星状态个数累加起来
				for (let i = 0; i < isInteger; i++) {
					resust.push(CLS_ON); 
				}
				//如果有半星状态的也累加起来（一般只有1个是半星状态，不然就是全星 或 没星）
				if (isDecimal) {
					resust.push(CLS_HALF); 
				}
				//如果resust的长度（星的个数）没有到5颗星 剩下的就用 没星的样式来补
				while (resust.length < LENGTH) {
					resust.push(CLS_OFF);  
				}
				//最后将累加的结果输出
				return resust;
			}
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/mixins.styl";
	.star
		font-size: 0px;
		& > i
			display: inline-block; background-repeat: no-repeat;
	&.star-24
		.star-item
			width: 10px; height: 10px; margin-right: 3px; background-size: 10px 10px;
			&:last-child
				margin-right: 0px;
			&.on
				bg-image("img/star24_on");
			&.half
				bg-image("img/star24_half");
			&.off
				bg-image("img/star24_off");
	&.star-36
		.star-item
			width: 15px; height: 15px; margin-right: 6px; background-size: 15px 15px;
			&:last-child
				margin-right: 0px;
			&.on
				bg-image("img/star36_on");
			&.half
				bg-image("img/star36_half");
			&.off
				bg-image("img/star36_off");
	&.star-48
		.star-item
			width: 20px; height: 20px; margin-right: 22px; background-size: 20px 20px;
			&:last-child
				margin-right: 0px;
			&.on
				bg-image("img/star48_on");
			&.half
				bg-image("img/star48_half");
			&.off
				bg-image("img/star48_off");
</style>
