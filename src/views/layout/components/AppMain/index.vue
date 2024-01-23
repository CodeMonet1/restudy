<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>
<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    },
    cachedViews() {
      return this.$store.state.tagView.cachedViews
    }
  }
}
</script>
<style lang="scss" scoped>
.app-main {
  box-sizing: border-box;
  height: calc(100vh - 134px);
  overflow: auto;
  background-color: $base-bg-color;
  padding: 30px;
}
</style>
