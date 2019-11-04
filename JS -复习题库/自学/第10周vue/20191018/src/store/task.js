import {
	queryTask
} from '../api/task';

export default {
	namespaced: true,
	state: {
		//=>存储所有任务信息的状态
		taskList: null
	},
	getters: {},
	mutations: {
		//=>更新任务列表状态数据
		updateTaskList(state, payload) {
			// payload是从服务器获取的最新任务数据
			state.taskList = payload;
		}
	},
	actions: {
		//=>从服务器获取数据，获取成功后通知MUTATIONS中的方法执行
		updateTaskListAction(context) {
			let commitName = "updateTaskList";
			queryTask().then(result => {
				if (parseInt(result.code) === 0) {
					context.commit(commitName, result.list);
					return;
				}
				return Promise.reject();
			}).catch(reason => {
				//=>默认存储的是NULL，代表还未从服务期获取过数据；如果获取失败，我们让其为空数组，虽然还是没有数据，但是至少证明我们尝试过获取操作；
				context.commit(commitName, []);
			});
		}
	}
};