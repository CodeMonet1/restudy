<template>
  <div id="about">
    <h1 class="h1">This is an movie page</h1>

    <treeselect v-model="value" :multiple="true" :options="options" />
  </div>
</template>

<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    // register the component
    components: { Treeselect },
    data() {
      return {
        // define the default value
        value: null,
        // define options
        options: [ {
          id: 'a',
          label: 'a',
          children: [ {
            id: 'aa',
            label: 'aa',
          }, {
            id: 'ab',
            label: 'ab',
          } ],
        }, {
          id: 'b',
          label: 'b',
        }, {
          id: 'c',
          label: 'c',
        } ],
      }
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        false && console.log("m1"),
        console.log("m2")
      }
    }
  }
</script>

<style lang="scss" scoped>
.h1 {
background-color:$base-bg-color;
}
</style>