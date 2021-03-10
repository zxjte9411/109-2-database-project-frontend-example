import { GetGamesByCategory } from "../../api/home";

const state = {
  items: []
};

const actions = {
  async getAllItems({ commit }, category) {
    const items = (await GetGamesByCategory(category)).data.data;
    items.forEach(item => {
      item.Inventory = parseInt(item.Inventory);
    });
    commit("setItems", items);
  }
};

const mutations = {
  setItems(state, items) {
    state.items = items;
  },
  decrementProductInventory(state, { Game_No }) {
    const item = state.items.find(item => item.id === Game_No);
    item.Inventory--;
  }
};

const getters = {
  Items() {
    return state.items;
  }
};

export default { namespaced: true, state, actions, mutations, getters };
