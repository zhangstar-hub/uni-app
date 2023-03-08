<template>
	<view>
		<view class="goods-item">
			<view class="goods-item-left">
				<image :src="goods.goods_small_logo" mode="" class="goods-pic"></image>
			</view>
			<view class="goods-item-right">
				<view class="goods-name">
					{{goods.goods_name}}
				</view>
				<view class="goods-info-box">
					<view class="goods-price">
						¥{{goods.goods_price | toFixed}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-goods",
		props: {
			goods: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				
			};
		},
		filters: {
			toFixed(value){
				return Number(value).toFixed(2)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #efefef;
		
		.goods-item-left{
			margin-right: 5px;
			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods-item-right{
			display: flex;
			flex-direction: column;
			justify-content: space-between;	
			
			.goods-name{
				font-size: 13px;
			}
			.goods-info-box{
				.goods-price{
					color: #c00000;
					font-size: 16px;
				}
			}
		}
	}
</style>