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

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
