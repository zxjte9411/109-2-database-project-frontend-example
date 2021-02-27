const getDefaultState = () => {
  return {
    // item: [{ id, quantity }]
    items: [],
    status: "empty"
  };
};

const state = getDefaultState();
const actions = {
  resetCartState({ commit }) {
    commit("resetCartState");
  }
};

const mutations = {
  resetCartState(state) {
    Object.assign(state, getDefaultState());
  }
};

const getters = {
  CartItems: (state, getters, rootState) => {
    return state.items.map(({ id, quantity }) => {
      const product = rootState.products.all.find(product => product.id === id);
      return {
        title: product.Name,
        price: product.Price,
        imageUrl: product.ImageURL,
        quantity
      };
    });
  }
};

export default { namespaced: true, state, actions, mutations, getters };
