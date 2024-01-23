<template>
  <el-popover placement="top" width="700" trigger="click" @show="getList">
    <el-table
      :data="downloadList"
      class="header-cell"
      border
    >
      <el-table-column :label="$t('文件名')" prop="name" width="350px"></el-table-column>
      <el-table-column :label="$t('时间')" prop="created_at" width="150px"></el-table-column>
      <el-table-column :label="$t('状态')">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">{{ $t('处理中') }}</span>
          <span v-else-if="scope.row.status === 1" style="color: blue">{{ $t('完成') }}</span>
          <span v-else style="color: red">{{ $t('失败') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('操作')">
        <template slot-scope="scope">
          <span
            class="btn-blue"
            v-if="scope.row.status === 1"
            @click="onDownload(scope.row.url)"
          >{{ $t('下载') }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div
      class="has-line setting-item cursor-pointer"
      slot="reference"
    >
      <i class="iconfont icon-xiazaidownload icon-setting font-bold" />
    </div>
  </el-popover>
</template>
<script>
export default {
  data() {
    return {
      downloadList: []
    }
  },
  methods: {
    getList() {
      this.$api.exportDownloadList().then(res => {
        this.downloadList = res.data
      })
    },
    onDownload(url) {
      window.open(url)
    }
  }
}
</script>
<style lang="scss" scoped>
.header-cell {
  color: #000 !important;
}
</style>
