export default {
    state: {
        shit: 0,
        currentTime: '',
        currentTrade: {}
    },
    getters: {
        getShit(state) {
            return state.shit;
        },
        getTime(state) {
            setInterval(_ => {
                let now = new Date();
                state.currentTime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' '
                    + (now.getHours() < 10 ? ('0' + now.getHours()) : now.getHours()) + ':'
                    + (now.getMinutes() < 10 ? ('0' + now.getMinutes()) : now.getMinutes()) + ":"
                    + (now.getSeconds() < 10 ? ('0' + now.getSeconds()) : now.getSeconds())
            }, 1000);
            return state.currentTime;
        },
        getCurrentTrade(state) {
            return state.currentTrade
        }
    },
    mutations: {
        plus(state) {
            state.shit++
        },
        setCurrentTrade(state, params) {
            state.currentTrade = params
        }
    }
}