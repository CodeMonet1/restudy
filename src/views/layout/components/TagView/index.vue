<template>
  <div class="tag-view-container">
    <el-tabs
      v-model="tabActive"
      type="card"
      class="tabs-content"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in visitedViews"
        :key="item.path"
        :label="item.topTitle ? `${item.topTitle}/${item.meta.title}` : item.meta.title"
        :name="item.name"
        :closable="visitedViews.length > 1 && !isAffix(item)"
      ></el-tab-pane>
    </el-tabs>
    <!-- <i
      class="iconfont icon-jinrumore-fill icon-back cursor-pointer"
      @click="$router.go(-1)"
    ></i> -->
    <el-dropdown @command="onClose">
      <span class="cursor-pointer">
        {{ $t('更多操作') }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="closeOther">
          <span>{{ $t('关闭其他') }}</span>
        </el-dropdown-item>
        <el-dropdown-item command="closeLeft">
          <span>{{ $t('关闭左侧') }}</span>
        </el-dropdown-item>
        <el-dropdown-item command="closeRight">
          <span>{{ $t('关闭右侧') }}</span>
        </el-dropdown-item>
        <el-dropdown-item command="closeAll">
          <span>{{ $t('关闭全部') }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TagView',
  data() {
    return {
      affixtabs: [],
      tabActive: ''
    }
  },
  watch: {
    $route: {
      handler(route) {
        this.addTags()
        let tabActive = ''
        this.visitedViews.forEach(view => {
          if (view.name === route.name) {
            tabActive = view.name
          }
        })
        this.tabActive = tabActive
      },
      immediate: true
    }
  },
  created() {
    this.intTabs()
  },
  methods: {
    handleTabClick(tab) {
      const route = this.visitedViews.filter((item, index) => Number(tab.index) === index)[0]
      if (route.path !== this.$route.path) {
        this.$router.push({
          path: route.path,
          fullPath: route.fullPath,
          query: route.query,
          params: route.params
        })
      }
    },
    async handleTabRemove(tabActive) {
      console.log(tabActive)
      let view
      this.visitedViews.forEach((item, index) => {
        if (tabActive === item.name) {
          view = item
        }
      })
      const { visitedViews } = await this.$store.dispatch(
        'tagView/delRoute',
        view
      )
      if (this.isActive(view)) {
        this.toLastTag(visitedViews)
      }
    },
    toLastTag(visitedViews) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        console.log(this.$route)
        // 跳转当前一级模块
        const { matched, fullPath } = this.$route
        matched.forEach(route => {
          if (route.meta && route.meta.level === 1) {
            console.log(fullPath, route.redirect)
            if (fullPath === route.redirect) {
              this.addTags()
            } else {
              this.$router.push(route)
            }
          }
        })
      }
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    intTabs() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.fileterAfterRouterMap))
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagView/addVisitedRoute', tag)
        }
      }
    },
    addTags() {
      const { name, matched } = this.$route
      if (name) {
        // 获取顶级模块名
        let topName = ''
        matched.forEach(item => {
          if (item.meta && item.meta.level === 1) {
            topName = item.meta.title
          }
        })
        this.$store.dispatch('tagView/addView', {
          ...this.$route,
          topTitle: topName
        })
      }
    },
    // 获取需要固定的 route
    filterAffixTags(routes) {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          tags.push({
            path: route.path,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    // 关闭 tab
    onClose(command) {
      switch (command) {
        case 'closeOther':
          this.closeOtherstabs()
          break
        case 'closeLeft':
          this.closeLefttabs()
          break
        case 'closeRight':
          this.closeRighttabs()
          break
        case 'closeAll':
          this.closeAlltabs()
          break
      }
    },
    async closeOtherstabs() {
      const view = await this.toThisTag()
      await this.$store.dispatch('tagView/delOthersRoutes', view)
    },
    async closeLefttabs() {
      const view = await this.toThisTag()
      await this.$store.dispatch('tagView/delLeftRoutes', view)
    },
    async closeRighttabs() {
      const view = await this.toThisTag()
      await this.$store.dispatch('tagView/delRightRoutes', view)
    },
    async closeAlltabs() {
      const view = await this.toThisTag()
      const { visitedViews } = await this.$store.dispatch(
        'tagView/delAllRoutes'
      )
      if (this.affixtabs.some((tag) => tag.path === view.path)) {
        return
      }
      this.toLastTag(visitedViews, view)
    },
    async toThisTag() {
      const view = this.visitedViews.filter((item, index) => {
        if (item.path === this.$route.fullPath) {
          return item
        }
      })[0]
      if (this.$route.path !== view.path) this.$router.push(view)
      return view
    }
  },
  computed: {
    ...mapGetters({
      visitedViews: 'tagView/visitedViews',
      fileterAfterRouterMap: 'fileterAfterRouterMap'
    })
  }
}
</script>
<style lang="scss">
.tag-view-container {
  box-sizing: border-box;
  padding: 10px 50px 10px 30px;
  border-top: 1px solid #f6f6f6;
  height: 54px;
  display: flex;
  align-items: center;
  .tabs-content {
    flex: 1;
    max-width: calc(100% - 37px);
    .el-tabs__header {
      border-bottom: 0;
      margin: 0;
    }
    .el-tabs__nav {
      border: 0 !important;
    }
    .el-tabs__item {
      box-sizing: border-box;
      line-height: 34px;
      height: 34px;
      border: 1px solid #dcdfe6 !important;
      border-radius: 4px;
      margin-right: 5px;
      transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
      &.is-active {
        border-color: $primary-color !important;
      }
    }
  }
  .icon-back {
    color: $primary-color;
    font-size: 22px;
    margin-left: 15px;
  }
}
</style>
