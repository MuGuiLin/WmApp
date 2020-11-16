<template>
	<section class="title">
		<div class="line"></div>
		<div class="text">{{detailText}}</div>
		<div class="line"></div>
	</section>
</template>

<script type="text/ecmascript-6"> 
	export default {
		props: {
			'detail-text': [Number, String]
		},
		mounted() {
			//alert(this.detailText);
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../../assets/stylus/mixins.styl";
	
	.title
		display: flex; margin 30px auto;
		.line
			flex: 1; position: relative; top: -6px; border-1px(rgba(255, 255, 255, 0.5));
		.text
			padding: 0px 12px; font-size: 15px; font-weight: 700;
</style>
