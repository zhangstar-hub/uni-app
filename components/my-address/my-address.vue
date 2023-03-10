<template>
	<view>
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">请选择收获地址+</button>
		</view>
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收获人：{{address.userName}}
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：{{address.telNumber}}
					</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收获地址：
				</view>
				<view class="row2-right">
					{{addstr}}
				</view>
			</view>
		</view>
		<view class="line"></view>
	</view>
</template>

<script>
	import {mapState, mapMutations, mapGetters} from 'vuex'
	export default {
		name:"my-address",
		data() {
			return {
			};
		},
		methods: {
			...mapMutations('m_user', ['updateAddress']),
			async chooseAddress(){
				await uni.chooseAddress({
					success: (res) => {
						this.updateAddress(res);
					},
					fail(err) {
						console.log(err);
						if(err && err.Msg === "chooseAddress:fail auth deny") {
							this.reAuth()
						}
					}
				})
			},
			reAuth(){
				uni.showModal({
					content: '监测到您没有打开地址权限，是否去设置打开？',
					confirmText: '确认',
					cancelText: '取消',
				}).then((confirmResult)=> {
					if(confirmResult.cancel) return uni.$showMsg('您取消了地址授权')
					if(confirmResult.confirm) {
						uni.openSetting({
							success(settingResult) {
								if(!settingResult.authSetting['scope.address']) return uni.$showMsg('您取消了授权')
								if(settingResult.authSetting['scope.address']) return uni.$showMsg('授权成功')
							}
							
						})
					}
				})
			}
		},
		computed: {
			...mapState('m_user', ['address']),
			...mapGetters('m_user', ['addstr']),
		}
	}
</script>

<style lang="scss">
	.address-choose-box {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.address-info-box {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;
		.row1{
			display: flex;
			justify-content: space-between;
			.row1-left{
				
			}
			.row1-right{
				display: flex;
				justify-content: space-between;
			}
		}
		.row2 {
			margin-top: 10px;
			display: flex;
			align-items: center;
			
			.row2-left{
				white-space: nowrap;
			}
			.row2-right{
				
			}
		}
	}
	.line {
		border-top: 2px solid #EFEFEF;
	}
</style>