<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
		<text class="tips-text">登录后尽享更多权益！</text>
	</view>
</template>

<script>
	import {mapMutations, mapState} from 'vuex'
	
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_user', ['redirectInfo']),
		},
		methods: {
			...mapMutations('m_user', ['updateUserInfo', 'updateToken', 'updateRediectInfo']),
			getUserInfo(e){
				// test
				this.updateToken('test')
				if(e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg("您取消了登录授权!")
				this.updateUserInfo(e.detail.userInfo);
				this.getToken(e.detail)
			},
			async getToken(info){
				const res = await uni.login().catch(err => err);
				if(res.errMsg !== "login:ok") return uni.$showMsg('登录失败！')
				const query = {
					code: res.code,
					encryptedData: info.encryptedData,
					iv: info.iv,
					rawData: info.rawData,
					signature: info.signature
				}
				const {data: loginResult} = await uni.$http.post("/api/public/v1/users/wxlogin", query)
				if(loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
				this.updateToken(loginResult.message.token)
				this.navigateBack()
			},
			navigateBack(){
				if(this.redirectInfo && this.redirectInfo.open_type === 'switchTab') {
					uni.switchTab({
						url: this.redirectInfo.form,
						complete: ()=> {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.login-container {
		height: 750rpx;
		background-color: #f8f8f8;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		overflow: hidden;
		
		.btn-login{
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #C00000;
		}
		.tips-text {
			font-size: 12px;
			color: gray;
		}
		
		&::after {
			content: ' ';
			display: block;
			width: 100%;
			height: 40px;
			background-color: white;
			position: absolute;
			bottom: 0;
			right: 0;
			border-radius: 100%;
			transform: translateY(50%);
		}
	}
</style>