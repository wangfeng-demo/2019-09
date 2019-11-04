import axios from './index';

/*
 * queryTask：获取任务列表信息 
 */
export function queryTask(state = 0) {
	return axios.get('/getTaskList', {
		params: {
			limit: 10000,
			page: 1,
			state
		}
	});
}

//=>增加任务信息
export function addTask(task, time) {
	return axios.post('/addTask', {
		task,
		time
	});
}

//=>删除任务信息
export function removeTask(taskId) {
	return axios.get('/removeTask', {
		params: {
			id: taskId
		}
	});
}

//=>把任务设置为已完成
export function completeTask(taskId) {
	return axios.get('/completeTask', {
		params: {
			id: taskId
		}
	});
}