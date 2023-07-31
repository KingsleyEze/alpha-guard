<template>
  <div class="sidebar-container">
    <router-link to="/">
      <img class="logo" :src="AppLogo" alt="DataGuard" />
    </router-link>
    <NavMenu />
    <PowerSwitch class="power-switch" />
    <div class="power-switch-wrapper"></div>
  </div>
</template>

<script lang="ts" setup>
import AppLogo from "@/assets/logo.png";
import NavMenu from "./components/nav-menu/NavMenu.vue";
import PowerSwitch from "./components/power-switch/PowerSwitch.vue";
</script>

<style scoped lang="scss">
.logo {
  width: 50%;
  margin: 30px 30px 50px -100px;
}
.sidebar-container {
  border-right: 1px solid rgb(231, 232, 233);
  height: 100%;
  position: relative;
}

.power-switch {
  position: absolute; /* Position the power-switch absolutely */
  bottom: 0; /* Stick it to the bottom */
}
</style>
