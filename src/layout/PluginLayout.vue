<template>
  <div class="plugin-container">
    <div class="plugin-header">
      <slot name="pluginHeader"></slot>
    </div>
    <div class="plugin-content">
      <slot name="pluginContent"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.plugin-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100vh;
  border: none;
}

.plugin-header {
  background-color: #fff;
  color: #2c3e50;
  width: 100%;
  height: 1s;
}

.plugin-content {
  background-color: #fff;
  color: #2c3e50;
  width: 100%;
  height: calc(100% - 1s);
}
</style>
