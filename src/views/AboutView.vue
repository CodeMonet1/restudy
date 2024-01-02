<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1>{{ st1 }}</h1>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  data() {
    return {
      st1:''
    }
  },
  created() {
    setTimeout(() => {
    this.st1 = "yiyiyi"
    },2000)
  }

}
</script>