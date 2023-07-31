import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import { Plugin } from "@/types";

export interface State {
  disableAllPlugins: boolean;
  plugins: Plugin[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    disableAllPlugins: false,
    plugins: [],
  },
  mutations: {
    setDisableAllPlugins(state, payload) {
      state.disableAllPlugins = payload;
    },
    setPlugins(state, payload) {
      state.plugins = payload;
    },
    togglePluginStatus(state, id) {
      const plugin = state.plugins.find((p) => p.id === id);
      if (plugin) {
        plugin.status = plugin.status === "active" ? "disabled" : "active";
      }
    },
  },
  actions: {
    async toggleDisableAllPlugins(context, payload) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/toggle-plugins",
          {
            toggleStatus: payload,
          }
        );

        if (response.status === 200) {
          context.commit("setDisableAllPlugins", payload);
          context.dispatch("fetchPlugins");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async fetchPlugins(context) {
      const { data } = await axios.get("http://localhost:3000/data");
      const tabsData = data.tabdata;
      const pluginsData = data.plugins;

      // If data.plugins is an object, convert it into an array
      let plugins: Plugin[] = [];
      if (typeof pluginsData === "object" && pluginsData !== null) {
        plugins = Object.keys(tabsData)
          .map((key) => {
            const { active, disabled, inactive } = tabsData[key];
            const createPlugin = (status: string) => (id: string) => ({
              id,
              title: pluginsData[id].title,
              description: pluginsData[id].description,
              status,
              tab: key,
            });

            return [
              ...active.map(createPlugin("active")),
              ...disabled.map(createPlugin("disabled")),
              ...inactive.map(createPlugin("inactive")),
            ];
          })
          .flat();
      }

      context.commit("setPlugins", plugins);
    },
    async async(context, { plugin, newStatus }) {
      await axios.post(
        `http://localhost:3000/tabdata/${plugin.tab}/${plugin.status}/${plugin.id}`,
        { status: newStatus }
      );
      context.commit("togglePluginStatus", plugin.id);
    },
  },
  plugins: [createPersistedState()],
});

export function useStore() {
  return baseUseStore(key);
}
