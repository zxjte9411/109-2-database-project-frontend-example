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
  },
  CartTotalPrice: (state, getters) => {
    return getters.CartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    });
  }
};

export default { namespaced: true, state, actions, mutations, getters };
