//=>所有的IMPORT都要写在JS文件最开始的位置
import './css/banner.css';
import Vue from 'vue';
import BannerPlugin from './js/banner-plugin';
import axios from './js/axios';

let vm = new Vue({
	el: '#app',
	data: {
		bannerData: [],
		temp: 1
	},
	components: {
		BannerPlugin
	},
	created() {
		axios.get('/banner').then(result => {
			if (parseInt(result.code) === 0) {
				this.bannerData = result.data;
			}
		});
	},
	methods: {
		transitionend(example) {
			this.temp = example.activeIndex + 1;
		}
	}
});