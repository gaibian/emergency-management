

const state = {
    pageLoading:false,
    appMainHeight:0,
    carWareNum:0,
}

const mutations = {
    SET_PAGE_LOADING(state,data) {
        state.pageLoading = data
    },
    SET_APPMAIN_HEIGHT(state,data) {
        state.appMainHeight = data
    },
    SET_CAE_WARE_NUM(state,data) {
        state.carWareNum = data
    }
}

const actions = {
    setPageLoading({ commit },data) {
        commit('SET_PAGE_LOADING', data)
    },
    setAppMainHeight({ commit },data) {
        commit('SET_APPMAIN_HEIGHT', data)
    },
    setCarWareNum({ commit },data) {
        commit('SET_CAE_WARE_NUM',data)
    }
}

export default {
    state,
    mutations,
    actions
}