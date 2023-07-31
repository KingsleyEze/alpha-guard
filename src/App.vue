<template>
  <div id="app">
    <AppLayout>
      <template #sidebar>
        <SidebarView />
      </template>
      <template #content>
        <router-view />
      </template>
    </AppLayout>
  </div>
</template>
<script lang="ts">
import AppLayout from "@/layout/AppLayout.vue";
import SidebarView from "@/views/sidebar/SidebarView.vue";
export default {
  components: {
    AppLayout,
    SidebarView,
  },
};
</script>
<style>
body {
  background-color: rgb(23, 52, 73);
  margin: 0;
  padding: 30px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
