<template>
	<div class="app" id="app">
	
		<v-header :seller="seller"></v-header>
		
		<v-nav></v-nav>
		
		<router-view :seller="seller"></router-view>

	</div>
</template>

<script type="text/ecmascript-6">
	import header from '@/components/header/header.vue'
	import nav from '@/components/nav/nav.vue'

	const ERROR = 0;
	
	export default {
		'components': {
			'v-header': header, 'v-nav': nav //接收引用外为组件模块
		},
		data() {
			return {
				'seller': {} //创建seller对象，用于接收resource返回的数据
			}
		},
		mounted() {
		  	this.$http.get('/api/seller', 'data:"seller"').then((data) => {
		  		if (data.body.erron === ERROR){
		  			this.seller = data.body.data; //将resource返回的数据 赋给seller对象 然后在上面的template中的v-header标签组件中 加入:seller="seller"，然后在外部的header.vue组件中就可以拿到seller数据啦！
		  		}
		  	});
		},
		'methods': {
		
		}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.app {}
	
</style>
