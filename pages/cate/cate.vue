<template>
	<view>
		<my-search @click='gotoSearch'></my-search>
		<view class="scroll-view-container">
			<!-- 左侧滑动区域 -->
			<scroll-view scroll-y="true" class="left-scroll-view" :style="{height: wh + 'px'}">
				<block v-for="(item, index) in cateList" :key="index" >
					<view :class="['left-scroll-view-item', index === active ? 'active': '']" @click="activeChange(index)">{{item.cat_name}}</view>
				</block>
			</scroll-view>
			<scroll-view scroll-y="true" class="righ-scroll-view" :style="{height: wh + 'px'}" :scroll-top="scroll_top">
			<view v-for="(item, index) in cateLevel2" :key="index" class="cate-lv2">
				<view class="cate-lv2-title">/{{ item.cat_name }}</view>
				<view class="cate-lv3-list">
					<view class="cate-lv3-item" v-for="(item3, index) in item.children" :key="index" @click="gotoGoodsList(item3)">
						<image :src="item3.cat_icon" mode=""></image>
						<text>{{item3.cat_name}}</text>
					</view>
				</view>
			</view>
			</scroll-view>
			<!-- 右侧滑动区域 -->
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				wh: 0,
				active: 0,
				cateList: [],
				cateLevel2: [],
				scrollTop: 0
				
			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync();
			this.wh = sysInfo.windowHeight - 50;
			this.getCateList();
		},
		methods: {
			async getCateList(){
				const {data: res} = await uni.$http.get("/api/public/v1/categories");
				if(res.meta.status !== 200) {
					return uni.$showMsg();
				}
				this.cateList = res.message
				// 二级分类赋值
				this.cateLevel2 = res.message[0].children
			},
			activeChange(index){
				this.active = index
				// 重新为二级分类赋值
				this.cateLevel2 = this.cateList[index].children
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			gotoGoodsList(item){
				uni.navigateTo({
					url: "/subpkg/goods_list/goods_list?c_id=" + item.cat_id,
				})
			},
			gotoSearch(){
				uni.navigateTo({
					url:"/subpkg/search/search"
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-view-container {
		display: flex;
	}
	.left-scroll-view {
		width: 120rpx;
	}
	.left-scroll-view-item {
		background-color: #f7f7f7;
		line-height: 60px;
		text-align: center;
		font-size: 12px;
		&.active {
			background-color: #ffffff;
			position: relative;
			
			&::before {
				content: ' ';
				display: block;
				width: 3px;
				height: 30px;
				background-color: #C00000;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 0;
			}
		}
	}
	.cate-lv2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}
	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 10px;
		.cate-lv3-item {
			image {
				width: 60px;
				height: 60px;
			}
			text {
				font-size: 12px;
			}
		}
	}
</style>
