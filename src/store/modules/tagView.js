const state = {
  visitedViews: [],
  cachedViews: []
}

const getters = {
  visitedViews: state => state.visitedViews,
  cachedViews: state => state.cachedViews
}

const mutations = {
  addVisitedRoute(state, route) {
    const target = state.visitedViews.find((item) => item.path === route.path)
    if (target) {
      if (route.fullPath !== target.fullPath) Object.assign(target, route)
      return
    }
    state.visitedViews.push(Object.assign({}, route))
  },
  delVisitedRoute(state, route) {
    state.visitedViews.forEach((item, index) => {
      if (item.path === route.path) state.visitedViews.splice(index, 1)
    })
  },
  updateVisitedRoute(state, route) {
    state.visitedViews.forEach((item) => {
      if (item.path === route.path) item = Object.assign(item, route)
    })
  },
  addCacheView(state, view) {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
  },
  delCacheView(state, view) {
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  delAllCacheView(state) {
    state.cachedViews = []
  },
  delOthersVisitedRoute(state, route) {
    state.visitedViews = state.visitedViews.filter(
      (item) => item.meta.affix || item.path === route.path
    )
  },
  delLeftVisitedRoute(state, route) {
    let index = state.visitedViews.length
    state.visitedViews = state.visitedViews.filter((item) => {
      if (item.name === route.name) index = state.visitedViews.indexOf(item)
      return item.meta.affix || index <= state.visitedViews.indexOf(item)
    })
  },
  delRightVisitedRoute(state, route) {
    let index = state.visitedViews.length
    state.visitedViews = state.visitedViews.filter((item) => {
      if (item.name === route.name) index = state.visitedViews.indexOf(item)
      return item.meta.affix || index >= state.visitedViews.indexOf(item)
    })
  },
  delAllVisitedRoutes(state) {
    state.visitedViews = state.visitedViews.filter((item) => item.meta.affix)
  }
}

const actions = {
  addView({ dispatch }, route) {
    dispatch('addVisitedRoute', route)
    dispatch('addCacheView', route)
  },
  addVisitedRoute({ commit }, route) {
    commit('addVisitedRoute', route)
  },
  addCacheView({ commit }, route) {
    commit('addCacheView', route)
  },
  async delRoute({ dispatch, state }, route) {
    await dispatch('delVisitedRoute', route)
    await dispatch('delCacheView', route)
    return {
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews]
    }
  },
  delVisitedRoute({ commit, state }, route) {
    commit('delVisitedRoute', route)
    return [...state.visitedViews]
  },
  delCacheView({ commit, state }, route) {
    commit('delCacheView', route)
    return [...state.cachedViews]
  },
  async delOthersRoutes({ dispatch, state }, route) {
    await dispatch('delOthersVisitedRoute', route)
    return {
      visitedViews: [...state.visitedViews]
    }
  },
  async delLeftRoutes({ dispatch, state }, route) {
    await dispatch('delLeftVisitedRoute', route)
    return {
      visitedViews: [...state.visitedViews]
    }
  },
  async delRightRoutes({ dispatch, state }, route) {
    await dispatch('delRightVisitedRoute', route)
    return {
      visitedViews: [...state.visitedViews]
    }
  },
  async delAllRoutes({ dispatch, state }, route) {
    await dispatch('delAllVisitedRoutes', route)
    return {
      visitedViews: [...state.visitedViews]
    }
  },
  delOthersVisitedRoute({ commit, state }, route) {
    commit('delOthersVisitedRoute', route)
    return [...state.visitedViews]
  },
  delLeftVisitedRoute({ commit, state }, route) {
    commit('delLeftVisitedRoute', route)
    return [...state.visitedViews]
  },
  delRightVisitedRoute({ commit, state }, route) {
    commit('delRightVisitedRoute', route)
    return [...state.visitedViews]
  },
  delAllVisitedRoutes({ commit, state }) {
    commit('delAllVisitedRoutes')
    return [...state.visitedViews]
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
}
