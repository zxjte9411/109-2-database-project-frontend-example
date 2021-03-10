import { GetGamesByCategory } from "../../api/home";

const state = {
  items: []
};

const actions = {
  async getAllGames({ commit }, category) {
    const items = (await GetGamesByCategory(category)).data.data;
    items.forEach(element => {
      element.Inventory = parseInt(element.Inventory);
    });
    commit("setGames", items);
  }
};

const mutations = {
  setGames(state, items) {
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
