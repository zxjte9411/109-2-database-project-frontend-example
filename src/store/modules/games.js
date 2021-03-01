import { GetGamesByCategory } from "../../api/home";

const state = {
  items: []
};

const actions = {
  async getAllGames({ commit }, category) {
    const items = (await GetGamesByCategory(category)).data.data;
    items.forEach(element => {
      element.inventory = 20;
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
    item.inventory--;
  }
};

const getters = {
  Items() {
    return state.items;
  }
};

export default { namespaced: true, state, actions, mutations, getters };
