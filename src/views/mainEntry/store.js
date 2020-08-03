const state = {
    mainUserInfoOpen: false,
}

const mutations = {
    mainUserInfoOpen: state => {
        state.mainUserInfoOpen = !state.mainUserInfoOpen
    }
}

export default {
    state,
    mutations
}
