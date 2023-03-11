<template>
	<view class="my-container">
		<my-login v-if="token === ''"></my-login>
		<my-user-info v-else></my-user-info>
		
	</view>
</template>

<script>
	import badgeMix from "@/mixins/tarbar_badge.js"
	import {mapState} from 'vuex'
	
	export default {
		data() {
			return {
				
			};
		},
		mixins: [badgeMix],
		computed: {
			...mapState('m_user', ['token'])
		}
	}
</script>

<style lang="scss">
	page, .my-container {
		height: 100%;
	}
</style>
