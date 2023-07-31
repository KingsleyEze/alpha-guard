<template>
  <HelloDataGuard v-if="!tabTitle" />
  <PluginLayout v-if="tabTitle">
    <template #pluginHeader>
      <div class="header-text">{{ tabTitle }} Plugins</div>
    </template>
    <template #pluginContent>
      <div class="plugin-list">
        <div
          class="plugin-item-card"
          v-for="plugin in currentTabPlugins"
          :key="plugin.id"
        >
          <div class="card-header">
            <div class="title">{{ plugin.title }}</div>
            <div class="toggle">
              <ToggleSwitch
                :modelValue="isActive(plugin)"
                @update:modelValue="() => togglePlugin(plugin)"
              />
              <p
                :class="{
                  allowed:
                    plugin.status === 'active' || plugin.status === 'inactive',
                  blocked:
                    plugin.status !== 'active' && plugin.status !== 'inactive',
                }"
              >
                {{
                  plugin.status === "active" || plugin.status === "inactive"
                    ? "Allowed"
                    : "Blocked"
                }}
              </p>
            </div>
          </div>
          <div class="content">{{ plugin.description }}</div>
        </div>
      </div>
    </template>
  </PluginLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { capitalize } from "lodash";
import PluginLayout from "@/layout/PluginLayout.vue";
import HelloDataGuard from "@/components/HelloDataGuard.vue";
import ToggleSwitch from "@/components/common/ToggleSwitch.vue";
import { useStore } from "@/store";
import { Plugin } from "@/types";

const store = useStore(); // use the store

const route = useRoute();
const tabTitle = ref("");
const currentTabKey = ref("");

const tabMapping: Record<string, string> = {
  Marketing: "tab1",
  Finance: "tab2",
  Personnel: "tab3",
};

const plugins = computed(() => store.state.plugins);

onMounted(async () => {
  tabTitle.value = capitalize(route.params.tab as string);
  currentTabKey.value = computed(() => tabMapping[tabTitle.value]).value;

  await store.dispatch("fetchPlugins");

  watch(
    () => route.params,
    () => {
      tabTitle.value = capitalize(route.params.tab as string);
      currentTabKey.value = tabMapping[tabTitle.value];
    }
  );
});

const isActive = (plugin: Plugin) => {
  return plugin.status !== "disabled";
};

const currentTabPlugins = computed(() => {
  const filteredPlugins = plugins.value.filter(
    (plugin) => plugin.tab === currentTabKey.value
  );
  return filteredPlugins;
});

const togglePlugin = async (plugin: Plugin) => {
  const newStatus = plugin.status === "active" ? "disabled" : "active";

  await store.dispatch("updatePluginStatus", { plugin, newStatus });
};
</script>

<style scoped lang="scss">
.header-text {
  font-weight: bold;
  font-size: 1.5em;
  padding-left: 40px;
  height: 120px;
  display: flex;
  align-items: center;
}

.plugin-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
  justify-items: center;
  padding: 20px;
}

.plugin-item-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 380px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  font-size: 1.25em;
  font-weight: bold;
}

.toggle {
  cursor: pointer;
  margin-top: 20px;

  p {
    margin: 0;
    font-size: 0.75em;
  }
  .allowed {
    color: green;
  }

  .blocked {
    color: red;
  }
}

.content {
  padding: 15px;
  font-size: 1em;
  text-align: left;
}
</style>
