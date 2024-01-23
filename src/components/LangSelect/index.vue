<template>
  <el-dropdown
    trigger="click"
    placement="bottom"
  >
    <span class="el-dropdown-link cursor-pointer">
      CN
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item in langList"
        :key="item.value"
        :disabled="item.value === lang"
      >{{ item.label }}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
export default {
  data() {
    return {
      langList: [
        { label: 'CN', value: 'cn' },
        { label: 'EN', value: 'en' }
      ],
      lang: 'cn'
    }
  }
}
</script>
<style lang="scss" scoped>
.el-dropdown-link {
  color: $primary-color;
}
</style>
