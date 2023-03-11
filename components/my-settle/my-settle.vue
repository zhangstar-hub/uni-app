<template>
	<view>
		<view class="my-settle-container">
			<label class="radio">
				<radio :checked="isFullCheck" color="#C00000" @click="changeAllState"/><text>全选</text>
			</label>
			<view class="amount-box">
				合计:<text class="amount">¥{{checkedGoodsAmount}}</text>
			</view>
			
			<view class="btn-settle" @click="settlement">
				结算({{checkedCount}})
			</view>
		</view>
	</view>
</template>

<script>
	import {mapGetters, mapMutations, mapState} from 'vuex'
	export default {
		name:"my-settle",
		data() {
			return {
				seconds: 3,
				timer: null,
			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
			...mapGetters('m_user', ['addstr']),
			...mapState('m_user', ['token']),
			
			isFullCheck(){
				return this.total == this.checkedCount
			}
		},
		methods: {
			...mapMutations('m_cart', ['updateAllGoodsState']),
			...mapMutations('m_user', ['updateRediectInfo']),
			changeAllState(){
				this.updateAllGoodsState(!this.isFullCheck)
			},
			settlement(){
				if(!this.checkedCount){
					return uni.$showMsg('请选择要结算的商品!')
				}
				if(!this.addstr){
					return uni.$showMsg("请选择收获地址!")
				}
				if(!this.token){
					this.delayNavigate()
				}
				
			},
			delayNavigate(){
				this.showTips(this.seconds)
				this.timer = setInterval(()=> {
					this.seconds--
					if(this.seconds <= 0) {
						clearInterval(this.timer)
						uni.switchTab({
							url:'/pages/my/my',
							success: ()=>{
								this.updateRediectInfo({
									open_type: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						this.seconds = 3;
						return
					}
					this.showTips(this.seconds);
				}, 1000)
			},
			showTips(n){
				uni.showToast({
					icon:'none',
					title: '请登录后结算, ' + n +'秒后挑战到登录页面',
					mask: true,
					duration: 1500
				})
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