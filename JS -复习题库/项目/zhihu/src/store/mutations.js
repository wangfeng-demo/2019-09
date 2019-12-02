/* export default {
    add(state, option) {
        state.count += option.n
    },
    minus(state, option) {
        state.count -= option.n
    }
} */
export const add = (state, option) => {
    state.count += option.n
}
export const minus = (state, option) => {
    state.count -= option.n
}
export function stateChange(state, option) {
    state.loginState = option.loginState
}
export function changeHotList(state, option) {
    //对于hotlist我们是整个替换 还是网上添加
    //option newType pldType
    if (option.newType == option.oldType) {
        state.hotList.push(...option.data)
    } else {
        state.hotList = option.data
    }

}