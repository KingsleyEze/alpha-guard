import { mount } from "@vue/test-utils";
import PluginView from "@/components/PluginView.vue";

// Define types
interface Plugin {
  id: string;
  name: string;
  status: string;
}

interface Store {
  state: {
    plugins: Plugin[];
  };
  actions: {
    updatePluginStatus: jest.Mock<any, any>;
  };
  getters: {
    getPluginById: (state: any) => (id: string) => Plugin | undefined;
  };
}

describe("PluginView.vue", () => {
  let mockStore: Store; // Declare mockStore with type

  beforeEach(() => {
    mockStore = {
      state: {
        plugins: [
          { id: "1", name: "Test Plugin 1", status: "enabled" },
          { id: "2", name: "Test Plugin 2", status: "disabled" },
        ],
      },
      actions: {
        updatePluginStatus: jest.fn(),
      },
      getters: {
        getPluginById: (state) => (id) =>
          state.plugins.find((p: Plugin) => p.id === id),
      },
    };
  });

  it("displays the plugin details correctly", () => {
    const wrapper = mount(PluginView, {
      mocks: {
        $store: mockStore,
      },
      propsData: {
        pluginId: "1",
      },
    });

    expect(wrapper.find(".plugin-name").text()).toBe("Test Plugin 1");
    expect(wrapper.find(".plugin-status").text()).toBe("Enabled");
  });

  it("triggers the action to update plugin status when button is clicked", async () => {
    const wrapper = mount(PluginView, {
      mocks: {
        $store: mockStore,
      },
      propsData: {
        pluginId: "1",
      },
    });

    await wrapper.find("button").trigger("click");
    expect(mockStore.actions.updatePluginStatus).toHaveBeenCalled();
  });
});
