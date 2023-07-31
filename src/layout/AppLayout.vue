<template>
  <div class="container">
    <div class="sidebar">
      <slot name="sidebar"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 90vh;
  border: none;
}

.sidebar {
  background-color: rgb(241, 241, 241);
  color: #2c3e50;
  width: 40%;
  height: inherit;
}

.content {
  background-color: #fff;
  color: #2c3e50;
  width: 100%;
  height: inherit;
}
</style>
