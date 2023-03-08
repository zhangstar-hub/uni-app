<template>
	<view>
		<view class="goods-list">
			<view v-for="(item, index) in goodsList" :key="index" @click="gotoDetail(item)">
				<my-goods :goods="item"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: "",
					cid: "",
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				isLoading: false
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || '';
			this.queryObj.cid = options.cid || '';
			this.getGoodsList();
		},
		onReachBottom(){
			this.queryObj.pagenum++;
			this.getGoodsList();
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1;
			this.total = 0;
			this.isLoading = false;
			this.goodsList = [];
			this.getGoodsList(()=> uni.stopPullDownRefresh())
		},
		methods: {
			async getGoodsList(cb){
				if(this.total > 0 && queryObj.pagenum * this.queryObj.pagesize >= this.total){
					return uni.$showMsg("数据加载完毕！")
				}
				if(this.isLoading) return
				this.isLoading = true;
				const {data: res} = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isLoading = false;
				cb && cb();
				if(res.meta.status !== 200) return uni.$showMsg();
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
			},
			gotoDetail(goods){
				uni.navigateTo({
					url:"/subpkg/goods_detail/goods_detail?goods_id=" + goods.goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.goods-list{
	}
</style>
