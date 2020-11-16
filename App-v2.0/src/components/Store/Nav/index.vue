<template>
	<nav class="nav-box barder-1px">
		<div class="nav-item">
			<router-link to="/goods">商 品</router-link>
		</div>
		<div class="nav-item">
			<router-link to="/ratings">评 论</router-link>
		</div>
		<div class="nav-item">
			<router-link to="/seller">商 家</router-link>
		</div>
	</nav>
</template>

<script type="text/ecmascript-6">
	export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus" >
	@import "../../../assets/stylus/mixins.styl";
	.nav-box 
		display: flex; width: 100%; height: 40px; line-height: 40px; border-1px(rgba(7, 17, 17, 0.1)) /*border-bottom: 1px solid rgba(7, 17, 17, 0.2);*/;
		.nav-item
			flex: 1; text-align: center; color: #4F5559;
			& > a 
				display: block; font-size: 14px;
				&.router-link-active
					background-color: #00c500; color: white; font-weight: bold;
</style>
