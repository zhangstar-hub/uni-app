<template>
	<view>
		<view class="my-settle-container">
			<label class="radio">
				<radio :checked="isFullCheck" color="#C00000" @click="changeAllState"/><text>全选</text>
			</label>
			<view class="amount-box">
				合计:<text class="amount">¥{{checkedGoodsAmount}}</text>
			</view>
			
			<view class="btn-settle">
				结算({{checkedCount}})
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			isFullCheck(){
				return this.total == this.checkedCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			changeAllState(){
				this.updateAllGoodsState(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		background-color: white;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		padding-left: 5px;
		
		.radio {
			display: flex;
			align-items: center;
		}
		.amount-box{
			.amount {
				font-weight: bolder;
				color: #C00000;
			}
		}
		.btn-settle{
			color: white;
			background-color: #C00000;
			height: 50px;
			line-height: 50px;
			padding: 0 10px;
			min-width: 100px;
			text-align: center;
		}
	}
</style>