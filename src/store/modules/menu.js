const state = {
    sidebarOpen: "",
}

const mutations = {
    setSidebar: (state, value) => {
        state.sidebarOpen = value
    }
}

const actions = {
    setSidebar({ commit }, value) {
        commit('setSidebar', value)
    }
}

const getters = {
    sidebarOpen: state => state.sidebarOpen
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
