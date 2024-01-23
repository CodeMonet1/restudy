<template>
  <div class="map">
    <OlMap/>
  </div>
</template>
<script>
// @ is an alias to /src
import OlMap from "@/components/mapView/olMap/OLMap.vue"
export default {
  name: 'MapView',
  components: { OlMap },
  data() {
    return {
    }
  },
  created() {

  }

}
</script>

<style lang="scss">

.map {
  width: 100%;
  height: 100%;
}
</style>