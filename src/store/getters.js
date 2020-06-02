const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  codeTable: state => {
    if (localStorage.getItem("codeTable")) {
      return JSON.parse(localStorage.getItem("codeTable"))
    } else {
      return state.code.codeTable
    }
  },
  sidebarOpen:state=>state.menu.sidebarOpen
}
export default getters
