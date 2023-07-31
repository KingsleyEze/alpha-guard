<template>
  <div
    class="toggle-container"
    :class="{ 'gradient-green': isToggledOn, 'gradient-red': !isToggledOn }"
  >
    <span class="plugin-text"
      >All plugins {{ isToggledOn ? "enabled" : "disabled" }}</span
    >
    <ToggleSwitch v-model="isToggledOn" @click="toggleDisableAllPlugins">
      <font-awesome-icon
        class="switch-icon"
        :class="{ on: isToggledOn, off: !isToggledOn }"
        icon="fa-solid fa-power-off"
      />
    </ToggleSwitch>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ToggleSwitch from "@/components/common/ToggleSwitch.vue";
import { useStore } from "@/store";

const store = useStore();
const isPluginsDisabled = computed(() => store.state.disableAllPlugins);

const isToggledOn = computed(() => isPluginsDisabled.value);

const toggleDisableAllPlugins = () =>
  store.dispatch("toggleDisableAllPlugins", !isToggledOn.value);
</script>

<style scoped lang="scss">
$green: #4caf50;
$red: #f44336;
$switch-width: 60px;
$switch-height: 34px;

.toggle-container {
  width: 100%;
  text-align: center;
  height: 80px;
  width: 100%;
  transition: background 0.4s;
  &.gradient-green {
    background: linear-gradient(to bottom, rgba(0, 204, 0, 0), $green);
  }

  &.gradient-red {
    background: linear-gradient(to bottom, rgba(204, 0, 0, 0), $red);
  }
}

.plugin-text {
  color: #000;
  font-size: 1rem;
  font-weight: bold;
  position: relative;
  top: -10px;
  margin-right: 10px;
}

.switch-icon {
  position: absolute;
  top: 20%;
  left: 20%;
  color: red;
  &.on {
    color: $green;
  }
  &.off {
    color: $red;
  }
}
</style>
