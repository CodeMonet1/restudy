<template>
    <div ref="olMap" class="ol-map"></div>
</template>
<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source.js';

export default {
  name: 'OLMap',
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    // 在组件挂载后初始化地图
    this.initMap();
  },
  methods: {
    initMap() {
      // 创建地图实例
      this.map = new Map({
        target: this.$refs.olMap, // 引用模板中的地图容器
        layers: [
        new TileLayer({
            source: new XYZ({
              url: 'http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}' // 高德瓦片在线链接
              // url: 'http://192.168.56.1:8080' + '/{z}/{x}/{y}.jpg'  // 设置本地离线瓦片所在路径
            })
          }),
          // new TileLayer({
          //   source: new XYZ({
          //     url: 'http://192.168.56.1:8080/over' + '/{z}/{x}/{y}.png'  // 设置本地离线瓦片所在路径
          //   })
          // })
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ol-map {
  width: 100%;
  height: 100%;
}
</style>