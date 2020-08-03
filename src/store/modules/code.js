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

const getters = {
    codeTable: state => {
        if (localStorage.getItem("codeTable")) {
            return JSON.parse(localStorage.getItem("codeTable"))
        } else {
            return state.codeTable
        }
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}
