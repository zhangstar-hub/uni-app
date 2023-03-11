<template>
	<view class="my-userinfo-container">
		<view class="top-box">
			<image src="../../static/logo.png" mode="" class="avatar"></image>
			<view class="nickname">
				xxx
			</view>
		</view>
		<view class="panel-list">
			<view class="panel">
				<view class="panel-body">
					<view class="panel-item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="panel-item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="panel-item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="panel-item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</view>
			<view class="panel">
				<view class="panel-title">
					我的订单
				</view>
				<view class="panel-body">
					<view class="panel-item">
						待付款
					</view>
					<view class="panel-item">
						待收货
					</view>
					<view class="panel-item">
						退款/退货
					</view>
					<view class="panel-item">
						全部订单
					</view>
				</view>
			</view>
			<view class="panel">
				<view class="panel-list-item">
					收获地址
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item">
					联系客服
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
				<view class="panel-list-item" @click="logout">
					退出登录
					<uni-icons type="arrowright" size="15"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations} from 'vuex'
	export default {
		name:"my-user-info",
		data() {
			return {
				
			};
		},
		methods: {
			...mapMutations('m_user', ['updateAddress', 'updateUserInfo', 'updateToken']),
			logout(){
				uni.showModal({
					title: '提示',
					content: '确认退出吗?',
					success: (data)=> {
						if(data.confirm) {
							this.updateAddress({});
							this.updateUserInfo({});
							this.updateToken('');
						}
					}
				})
			}
		}
	}
</script>
	
<style lang="scss">
	.my-userinfo-container {
		height: 100%;
		background-color: #F4F4F4;
		
		.top-box {
			height: 400rpx;
			background-color: #C00000;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
		}
		.avatar {
			height: 90px;
			width: 90px;
			border-radius: 45px;
			border: 2px solid #FFF;
			box-shadow: 0 1px 5px black;
		}
		.nickname {
			font-size: 16px;
			color: #fff;
			
		}
	}
	.panel-list {
		padding: 0px 10px;
		position: relative;
		top: -10px;
		
		.panel {
			background-color: white;
			border-radius: 3px;
			margin-bottom: 8px;
			.panel-title {
				line-height: 45px;
				padding-left: 10px;
				font-size: 15px;
				border-bottom: 1px solid #f4f4f4;
			}
			
			.panel-body {
				display: flex;
				justify-content: space-around;
				
				.panel-item {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					padding: 10px 0;
					font-size: 13px;
				}
			}
			.panel-list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 15px;
				padding: 0 10px;
				line-height: 45px;
			}
		}
	}
</style>