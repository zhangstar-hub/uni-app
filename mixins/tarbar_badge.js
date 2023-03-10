import {mapGetters} from "vuex"
export default {
	watch: {
		total(){
			this.setBadge();
		}
	},
	computed: {
		...mapGetters('m_cart', ['total'])
	},
	onShow() {
		this.setBadge()
	},
	methods: {
		setBadge(){
			uni.setTabBarBadge({
				text: this.total + '',
				index: 2
			})
		}
	}
}