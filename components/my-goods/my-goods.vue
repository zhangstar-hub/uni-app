<template>
	<view>
		<view class="goods-item">
			<view class="goods-item-left">
				<radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioClickHandler"/>
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
					<uni-number-box :min="1" :value="goods.goods_count" v-if="showNum" @change="numChangeHandler"></uni-number-box>
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
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNum: {
				type: Boolean,
				default: false
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
		},
		methods: {
			radioClickHandler(){
				this.$emit('radio-change', {
					goods_id: this.goods.goods_id,
					goods_state: !this.goods.goods_state,
				})
			},
			numChangeHandler(value){
				this.$emit('num-change', {
					goods_id: this.goods.goods_id,
					goods_count: +value
				})
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
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods-item-right{
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;	
			
			.goods-name{
				font-size: 13px;
			}
			.goods-info-box{
				display: flex;
				justify-content: space-between;
				align-items: center;
				.goods-price{
					color: #c00000;
					font-size: 16px;
				}
			}
		}
	}
</style>