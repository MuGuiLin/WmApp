<template>
	<nav class="nav barder-1px">
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
	@import "../../common/stylus/mixins.styl";

	.nav 
		display: flex; width: 100%; height: 40px; line-height: 40px; border-bottom: 1px solid rgba(7, 17, 17, 0.2); /*border-1px(rgba(7, 17, 17, 0.1))*/;
		.nav-item
			flex: 1; text-align: center; color: #4F5559;
			& > a 
				display: block; font-size: 14px;
				&.router-link-active
					background-color: #22affe; color: white; font-weight: bold;
</style>
