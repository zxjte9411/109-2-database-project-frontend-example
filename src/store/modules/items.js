import { GetGamesByCategory } from "../../api/home";

const state = {
  items: []
};

const actions = {
  async getAllGames({ commit }) {
    const items = (await GetGamesByCategory("all")).data.data;
    console.log(items);
    commit("setGames", items);
  }
};

const mutations = {
  setGames(state, items) {
    state.items = items;
  }
};

const getters = {};

export default { namespaced: true, state, actions, mutations, getters };
