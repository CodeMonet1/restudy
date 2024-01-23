<template>
  <div>
    <div class="app-wrapper">
      <!-- <side-bar class="sidebar-container" /> -->
      <div class="layout-container-verical">
        <top-nav class="topnav-container" />
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import { SideBar, TopNav, AppMain } from "./components";
export default {
  name: "LayoutContainer",
  components: { SideBar, TopNav, AppMain },
  created() {
    console.log(this.$router);
  }
};
</script>

<style lang="scss" scoped></style>
