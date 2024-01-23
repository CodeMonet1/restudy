import Vue from 'vue'
import Vuex from 'vuex'
import tagView from './modules/tagView'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // isPermissionFilter: false,
    // fileterAfterRouterMap: [],
    // isPermissionFilterArr: [],
    // token: '',
    // topParent: '',
    // tableLoading: false,
    // btnLoading: false,
    companyInfo: {}
  },
  getters: {
    // fileterAfterRouterMap: (state) => {
    //   return state.fileterAfterRouterMap[0]
    //     ? state.fileterAfterRouterMap[0].children
    //     : []
    // },
    company: state => state.companyInfo
  },
  mutations: {
    // savePermissionStatus(state, data) {
    //   state.isPermissionFilter = data
    // },
    // saveFileterAfterRouterMap(state, data) {
    //   state.fileterAfterRouterMap = data.fileterAfterRouterMap
    //   state.isPermissionFilterArr = data.isPermissionFilterArr
    // },
    // saveTopParent(state, data) {
    //   state.topParent = data
    // },
    // updateTableLoading(state, data) {
    //   state.tableLoading = data
    // },
    // switchBtnLoading(state, data) {
    //   state.btnLoading = data
    // },
    // saveToken(state, data) {
    //   if (data) {
    //     state.token = data
    //     localStorage.setItem('token', data)
    //   } else {
    //     state.token = ''
    //     localStorage.removeItem('token')
    //   }
    // },
    // initToken(state) {
    //   state.token = localStorage.getItem('token') || ''
    // },
    saveCompany(state, data) {
      state.companyInfo = data
    }
  },
  actions: {},
  modules: {
    tagView
  }
})
