<template>
  <i
    class="iconfont icon-setting font-bold cursor-pointer"
    :class="isFullscreen ? 'icon-tuichuquanping' : 'icon-quanping'"
    @click="click"
  />
</template>
<script>
import screenfull from 'screenfull'
export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', this.change)
      }
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen
    },
    click() {
      if (!screenfull.isEnabled) {
        return false
      }
      screenfull.toggle()
    }
  }
}
</script>
