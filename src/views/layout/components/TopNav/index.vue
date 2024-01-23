<template>
  <div class="fixed-header">
    <div class="nav-top">
      <!-- <i
        class="icon-collapse cursor-pointer"
        :class="[ isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold']"
        @click="toogleSidebar"
      /> -->
      <div class="menu">
        <el-menu
          mode="horizontal"
          :default-active="activeIndex"
          class="top-menu-list"
          @select="onSelect"
          text-color="#545F6E"
          active-text-color="#004098"
        >
          <el-menu-item
            class="top-menu-item"
            v-for="item in formatTopRoutes"
            :key="item.path"
            :index="item.path"
          >
            {{ $t(item.title) }}
          </el-menu-item>
        </el-menu>
      </div>
      <div class="setting-item">
        <screenfull />
      </div>
      <div class="has-line setting-item lang-item font-bold">
        <lang-select />
      </div>
      <download />
      <div
        class="has-line setting-item cursor-pointer"
        @click="$router.push({ name: 'consoleQuestion' })"
      >
        <i class="iconfont icon-tiwenquestion icon-setting font-bold" />
      </div>
      <div
        class="has-line setting-item cursor-pointer"
        @click="$router.push({ name: 'consoleMessage' })"
      >
        <i class="iconfont icon-youjianmail icon-setting font-bold" />
      </div>
      <div
        class="user has-line setting-item cursor-pointer"
        @click="$router.push({ name: 'consoleHomeCenter' })"
      >
        <div class="user-name">{{ company.name }}</div>
        <div>
          <span v-if="company.email">{{ company.email }}</span>
          <span v-else>{{ $t('绑定邮箱') }} <i class="el-icon-arrow-right"></i></span>
        </div>
      </div>
      <div class="cursor-pointer" @click="logout">
        <i class="el-icon-switch-button icon-logout font-bold"></i>
      </div>
    </div>
    <tag-view />
  </div>
</template>
<script>
import LangSelect from '@/components/LangSelect/index'
import Screenfull from '@/components/Screenfull/index'
import TagView from '../TagView/index.vue'
import Download from './download.vue'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  components: {
    LangSelect,
    Screenfull,
    TagView,
    Download
  },
  created() {
    if (!this.company.name) {
      this.getAccountInfo()
    }
  },
  methods: {
    toogleSidebar() {
      this.$store.commit('toogleSidebar')
    },
    onSelect(routeName) {
      this.$router.push({ name: routeName })
    },
    logout() {
      this.$confirm('您确定要退出登录吗', '提示', {
        type: 'warning'
      }).then(() => {
        this.$store.commit('saveToken', '')
        this.$router.push('/login')
      })
    },
    getAccountInfo() {
      this.$api.getAccountInfo().then(res => {
        this.$store.commit('saveCompany', {
          name: res.data.company_name,
          email: res.data.email
        })
      })
    }
  },
  computed: {
    ...mapGetters(['company']),
    formatTopRoutes() {
      const formatRouters = []
      const routers = this.$store.state.fileterAfterRouterMap[0] || []
      routers.children.forEach((ele) => {
        if (ele.meta && ele.meta.level === 1) {
          formatRouters.push({
            path: ele.name,
            title: ele.meta.title
          })
        }
      })
      return formatRouters
    },
    activeIndex() {
      return this.$route.meta ? this.$route.meta.topParent : ''
    }
  }
}
</script>
<style lang="scss">
.fixed-header {
  background-color: #fff;
}
.nav-top {
  padding: 0 50px 0 30px;
  display: flex;
  height: 80px;
  align-items: center;
  line-height: 40px;
  .icon-collapse {
    font-size: 22px;
  }
  .has-line {
    border-left: 1px solid #EEF4FE;
  }
  .setting-item {
    padding: 0 12px;
    min-width: 40px;
    text-align: center;
  }
  .lang-item {
    color: $primary-color;
    font-size: $base-font-size-large;
  }
  .icon-setting {
    color: $primary-color;
    font-size: 18px;
    vertical-align: middle;
  }
  .icon-logout {
    font-size: 18px;
    vertical-align: middle;
  }
  .user {
    line-height: 1.3;
    text-align: left;
    height: 40px;
    padding-top: 5px;
    box-sizing: border-box;
  }
  .user-name {
    font-weight: bold;
  }
  .top-menu-list {
    border-bottom: none;
  }
  .menu {
    flex: 1;
    margin-left: 50px;
  }
  .top-menu-item {
    height: 80px;
    line-height: 80px;
    min-width: 90px;
    text-align: center;
    &.is-active {
      font-weight: bold;
      border-width: 5px;
    }
  }
}
</style>
