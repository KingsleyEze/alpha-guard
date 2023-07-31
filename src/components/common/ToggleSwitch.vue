<template>
  <div
    @click="toggle"
    class="switch"
    :class="{ 'switch-on': isToggledOn, 'switch-off': !isToggledOn }"
  >
    <div
      class="switch-handle"
      :style="isToggledOn ? 'transform: translateX(26px)' : ''"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, SetupContext } from "vue";

interface Props {
  modelValue: boolean;
}

export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props: Props, { emit }: SetupContext) {
    let isToggledOn = ref(props.modelValue);

    const toggle = () => {
      isToggledOn.value = !isToggledOn.value;
      emit("update:modelValue", isToggledOn.value);
    };

    return {
      isToggledOn,
      toggle,
    };
  },
};
</script>

<style scoped lang="scss">
$green: #4caf50;
$red: #f44336;
$switch-width: 60px;
$switch-height: 34px;

.switch {
  position: relative;
  border-radius: 50px;
  display: inline-block;
  width: $switch-width;
  height: $switch-height;
  cursor: pointer;
  transition: 0.4s;

  &-handle {
    position: absolute;
    top: 0;
    left: 0;
    width: 26px;
    height: 26px;
    bottom: 0;
    background-color: #fff;
    transition: 0.4s;
    margin: 4px;
    border-radius: 50%;

    & .switch-icon {
      position: absolute;
      top: 20%;
      left: 20%;
      color: red;
    }
  }

  &-on {
    background-color: $green;
    .switch-icon {
      color: $green;
    }
  }

  &-off {
    background-color: $red;
    .switch-icon {
      color: $red;
    }
  }
}
</style>
