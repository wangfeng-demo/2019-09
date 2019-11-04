//=>左右切换按钮
const BannerButton = {
	template: `<div>
		<a href="javascript:;" class="button-prev" @click="change('left')"></a>
		<a href="javascript:;" class="button-next" @click="change('right')"></a>
	</div>`,
	data() {
		return {}
	},
	methods: {
		change(dir) {
			this.$emit('handle', dir);
		}
	}
};
//=>分页器
const BannerPagination = {
	template: `<div class="pagination">
		<span v-for='(item,i) in arr' 
			:class="{active:activeHandle(i)}" 
			@click="change(i)">
		</span>
	</div>`,
	props: ['total', 'index'],
	data() {
		return {
			arr: new Array(this.total).fill(null)
		}
	},
	methods: {
		activeHandle(i) {
			//=>i:当前循环这一项的索引
			//=>this.index:当前展示SLIDE的索引
			let temp = this.index === this.total ? 0 : this.index;
			return i === temp;
		},
		change(i) {
			this.$emit('pagination', i);
		}
	}
};
//=>轮播图组件
const BannerPlugin = {
	template: `<section class="container" 
		@mouseenter='stopTimer(true)' 
		@mouseleave='stopTimer()'>
		<div class="wrapper" :style='sty' ref='wrapper'>
			<div class="slide" v-for='item in bannerData'>
				<img :src="item.pic" alt="">
			</div>
		</div>
		<banner-pagination v-if='pagination' 
			:total='bannerData.length-1' 
			:index='activeIndex'
			@pagination='handlePagination'>
		</banner-pagination>
		<banner-button v-if='button' @handle='handleButton'></banner-button>
	</section>`,
	//=>传递属性的校验（当前轮播图组件支持的参数配置）
	props: {
		//=>轮播图的数据 [{id:1,pic:'xxx.png'},...]
		data: {
			type: Array,
			required: true
		},
		//=>初始展示索引
		initialslide: {
			type: Number,
			default: 0
		},
		//=>运动间隔（如果值为零则为不开起自动轮播）
		interval: {
			type: Number,
			default: 3000
		},
		//=>每一次运动动画的时间
		speed: {
			type: Number,
			default: 200
		},
		//=>是否设置分页器（默认一旦设定分页器，点击分页器也能实现切换）
		pagination: {
			type: Boolean,
			default: true
		},
		//=>是否设置左右导航
		button: {
			type: Boolean,
			default: true
		},
		//=>初始化成功的钩子函数
		init: {
			type: Function,
			default: Function.prototype
		},
		//=>切换完成后的钩子函数
		transitionend: {
			type: Function,
			default: Function.prototype
		}
	},
	components: {
		BannerPagination,
		BannerButton
	},
	data() {
		let bannerData = [...this.data, this.data[0]],
			activeIndex = this.initialslide;
		return {
			//=>把传递进来的数据第一张克隆一份放到末尾
			bannerData,
			//=>当前选中SLIDE的索引
			activeIndex,
			//=>WRAPPER的样式
			sty: {
				width: bannerData.length * 1000 + 'px',
				left: -activeIndex * 1000 + 'px',
				transition: `left ${this.speed}ms linear`
			}
		}
	},
	methods: {
		autoMove() {
			this.activeIndex++;
			if (this.activeIndex >= this.bannerData.length) {
				this.sty.transition = `left 0ms linear`;
				this.sty.left = '0px';
				//=>回调函数会在本次修改数据后，DOM视图重新渲染完成过后执行
				this.$nextTick(() => {
					this.$refs.wrapper.offsetLeft;
					this.activeIndex = 1;
					this.sty.transition = `left ${this.speed}ms linear`;
					this.sty.left = -this.activeIndex * 1000 + 'px';
				});
				return;
			}
			this.sty.transition = `left ${this.speed}ms linear`;
			this.sty.left = -this.activeIndex * 1000 + 'px';
		},
		stopTimer(lx) {
			if (lx) {
				clearInterval(this.autoTimer);
				this.autoTimer = null;
				return;
			}
			this.autoTimer = setInterval(this.autoMove, this.interval);
		},
		handleButton(dir) {
			if (dir === 'right') {
				this.autoMove();
				return;
			}
			this.activeIndex--;
			if (this.activeIndex < 0) {
				this.sty.transition = `left 0ms linear`;
				this.sty.left = -(this.bannerData.length - 1) * 1000 + 'px';
				this.$nextTick(() => {
					this.$refs.wrapper.offsetLeft;
					this.activeIndex = this.bannerData.length - 2;
					this.sty.transition = `left ${this.speed}ms linear`;
					this.sty.left = -this.activeIndex * 1000 + 'px';
				});
				return;
			}
			this.sty.transition = `left ${this.speed}ms linear`;
			this.sty.left = -this.activeIndex * 1000 + 'px';
		},
		handlePagination(i) {
			this.activeIndex = i;
			this.sty.transition = `left ${this.speed}ms linear`;
			this.sty.left = -this.activeIndex * 1000 + 'px';
		}
	},
	//=>第一次组件渲染完成，开始自动轮播
	mounted() {
		this.autoTimer = setInterval(this.autoMove, this.interval);
		//=>触发init钩子函数执行
		this.init(this);
	},
	updated() {
		//=>触发切换完的钩子执行
		this.transitionend(this);
	}
};