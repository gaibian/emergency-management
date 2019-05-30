

const state = {
    pageLoading:false,
    appMainHeight:0,
}

const mutations = {
    SET_PAGE_LOADING(state,data) {
        state.pageLoading = data
    },
    SET_APPMAIN_HEIGHT(state,data) {
        state.appMainHeight = data
    }
}

const actions = {
    setPageLoading({ commit },data) {
        commit('SET_PAGE_LOADING', data)
    },
    setAppMainHeight({ commit },data) {
        commit('SET_APPMAIN_HEIGHT', data)
    }
}

export default {
    state,
    mutations,
    actions
}