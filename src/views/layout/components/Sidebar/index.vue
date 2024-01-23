<template>
  <div>
    <div wrap-class="scrollbar-wrapper">
      <logo />
      <div class="side-menu-box">
        <el-menu
          background-color="#004098"
          text-color="#FFF"
          active-text-color="#004098"
          class="side-menu"
          :default-active="activeIndex"
          @select="onItem"
          collapse
        >
          <div v-for="item in formatRoutes" :key="item.path">
            <el-submenu
              v-if="item.groups"
              popper-class="submenu-box"
              :index="item.path"
            >
              <template slot="title">
                <i :class="['iconfont', 'icon-menu', item.icon]" />
                <span>{{ $t(item.title) }}</span>
              </template>
              <el-menu-item-group
                v-for="(group, idx) in item.groups"
                :key="idx + group.name"
              >
                <span slot="title" v-if="group.name" class="group">{{ $t(group.name) }}</span>
                <el-menu-item
                  v-for="ele in group.children"
                  :key="ele.path"
                  :index="ele.path"
                >
                  <div class="item-name">
                    <span>{{ $t(ele.title) }}</span>
                  </div>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item class="side-menu-item" :index="item.path" v-else>
              <div class="item-name">
                <i :class="['iconfont', 'icon-menu', item.icon]" />
                <span>{{ $t(item.title) }}</span>
              </div>
            </el-menu-item>
          </div>
        </el-menu>
      </div>
    </div>
  </div>
</template>
<script>
import Logo from './Logo.vue'
export default {
  name: 'SideBar',
  components: {
    Logo
  },
  methods: {
    onItem(path) {
      if (this.$route.path !== path) {
        this.$router.push(path)
      }
    }
  },
  computed: {
    formatRoutes() {
      const topParent = this.$store.state.topParent
      const formatRouters = {}
      const routers = this.$store.state.fileterAfterRouterMap[0] || []
      routers.children.forEach((item) => {
        if (item.name === topParent) {
          item.children.forEach((ele) => {
            // 判断是二级还是三级
            const meta = ele.meta
            if (meta.level === 2) {
              formatRouters[ele.name] = {
                path: ele.path,
                title: ele.meta.title,
                icon: ele.meta.icon,
                activeIcon: ele.meta.activeIcon
              }
            } else if (meta.level === 3) {
              if (formatRouters[meta.parent]) {
                const groupName = ele.meta.group || ''
                let flag = true
                formatRouters[meta.parent].groups.forEach(group => {
                  if (groupName === group.name) {
                    group.children.push({
                      path: ele.path,
                      title: ele.meta.title
                    })
                    flag = false
                  }
                })
                if (flag) {
                  formatRouters[meta.parent].groups.push({
                    name: ele.meta.group || '',
                    children: [{ path: ele.path, title: ele.meta.title }]
                  })
                }
              } else {
                const groups = [{
                  name: ele.meta.group || '',
                  children: [{ path: ele.path, title: ele.meta.title }]
                }]
                formatRouters[meta.parent] = {
                  title: ele.meta.parentTitle,
                  icon: ele.meta.icon,
                  path: ele.meta.parent,
                  groups
                }
              }
            }
          })
        }
      })
      return formatRouters
    },
    activeIndex() {
      const { meta } = this.$route
      return meta.level && meta.level !== 4 ? this.$route.path : meta.parent
    }
  }
}
</script>
<style lang="scss">
.side-menu-box {
  padding-left: 10px;
  margin-top: 50px;
  .icon-menu {
    color: #fff;
    margin-right: 8px;
  }
  .side-menu-item {
    border-radius: 30px 0 0 30px;
    font-size: 16px;
    &.is-active {
      background-color: #fff !important;
      .icon-menu {
        color: $primary-color;
      }
    }
  }
  .side-menu {
    border-right: 0;
    &.el-menu--collapse {
      width: 100%;
    }
  }
  .item-name {
    vertical-align: middle;
  }
  .el-submenu__icon-arrow {
    display: none !important;
  }
  .el-submenu {
    .el-submenu__title {
      border-radius: 30px 0 0 30px;
      font-size: 16px;
    }
    &.is-active {
      .el-submenu__title {
        background-color: #fff !important;
        color: $primary-color !important;
        .icon-menu {
          color: $primary-color;
        }
      }
    }
  }
}
.submenu-box {
  .el-menu {
    background-color: #fff !important;
  }
  .el-menu-item {
    background-color: #fff !important;
    height: 50px;
    line-height: 50px;
    color: $base-font-color !important;
    &:hover {
      color: $primary-color !important;
    }
    &.is-active {
      color: $primary-color !important;
    }
  }
  .el-menu-item-group__title {
    padding-top: 0;
    padding-bottom: 0;
  }
  .group {
    padding-top: 7px;
    padding-bottom: 7px;
    display: inline-block;
  }
}
</style>
