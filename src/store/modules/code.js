const state = {
    codeTable: {},
}

const mutations = {
    set_CodeTable: (state, value) => {
        state.codeTable = value
        localStorage.setItem("codeTable", JSON.stringify(value))
    },
}

const actions = {
    setCodeTable({ commit }, value) {
        commit('set_CodeTable', value)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
