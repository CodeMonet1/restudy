<template>
  <div class="home">
    <h1>This is an home page</h1>
    <h1>{{ st1 }}</h1>
    <nav>
      <router-link to="/home/tab1">tab1</router-link> |
      <router-link to="/home/tab2">tab2</router-link>
    </nav>
    <router-view></router-view>

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
    this.st1 = "yiyiyihome"
    },2000)
  }
}
</script>
