<template lang="">
  <div>
    <Router />

    <router-view></router-view>
  </div>
</template>
<script>
import Router from './router/index'
import { useUserStore } from './stores/UserStore'
export default {
  components: {
    Router
  },
  data() {
    return {
      userStore: useUserStore(),
    }
  },
  created(){
    const routes = Router.getRoutes()
    console.log(routes);
    this.userStore.getTokenFromStorage()
    
  },

}
</script>