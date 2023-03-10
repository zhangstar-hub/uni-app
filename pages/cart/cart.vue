<template>
	<view>		
		<view class="cart-container" v-if="cart.length !== 0">
			<my-address></my-address>
			<view class="cart-title">
				<uni-icons type="shop" size="18"></uni-icons>
				<text class="cart-title-text">购物车</text>
			</view>
			<uni-swipe-action>
				<block v-for="(goods, index) in cart" :key="index">
					<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(goods)" @change="">
						<my-goods :goods="goods" :showRadio="true" :showNum="true" @radio-change="radioChangeHandler" @num-change="numChangeHandler"></my-goods>
					</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
			<my-settle></my-settle>
		</view>
		<view class="empty-cart" v-else>
			<text class="empty-cart-text">空空如也</text>
		</view>
	</view>
</template>

<script>
	import badgeMix from "@/mixins/tarbar_badge.js"
	import {mapState, mapMutations} from 'vuex'
	
	export default {
		computed: {
			...mapState('m_cart', ['cart'])
		},
		data() {
			return {
				options:[
				{
					text: '删除',
					style: {
						backgroundColor: '#C00000'
					}
				}
			  ]
			};
		},
		mixins: [badgeMix],
		methods: {
			...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
			radioChangeHandler(goods){
				this.updateGoodsState(goods);
			},
			numChangeHandler(goods){
				this.updateGoodsCount(goods)
			},
			swipeItemClickHandler(goods){
				this.removeGoodsById(goods.goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		
		.cart-title-text {	
			margin-left: 10px;
			font-size: 14px;
		}
	}
	.cart-container {
		padding-bottom: 50px;
	}
	.empty-cart {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 550px;
		width: 100%;
		color: gray;
	}
</style>
