const getDefaultState = () => {
  const items = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  return {
    // item: [{ id, quantity }]
    items,
    checkoutStatus: null
  };
};

const state = getDefaultState();

const actions = {
  resetCartState({ commit }) {
    commit("resetCartState");
  },
  addProductToCart({ state, commit }, game) {
    console.log(state.items);
    console.log(game);
    commit("setCheckoutStatus", null);
    if (game.inventory > 0) {
      const cartItem = state.items.find(item => item.id === game.Game_No);
      if (!cartItem) {
        commit("pushProductToCart", { id: game.Game_No });
      } else {
        commit("incrementItemQuantity", cartItem);
      }
      // remove 1 item from stock
      // commit(
      //   "games/decrementProductInventory",
      //   { id: item.Game_No },
      //   { root: true }
      // );
    }
  }
};

const mutations = {
  resetCartState(state) {
    Object.assign(state, getDefaultState());
  },
  setCheckoutStatus(state, status) {
    state.checkoutStatus = status;
  },
  pushProductToCart(state, { id }) {
    state.items.push({
      id,
      quantity: 1
    });
    localStorage.setItem("cart", JSON.stringify(state.items));
  },
  incrementItemQuantity(state, { id }) {
    const cartItem = state.items.find(item => item.id === id);
    cartItem.quantity++;
    localStorage.setItem("cart", JSON.stringify(state.items));
  }
};

const getters = {
  CartItems: (state, getters, rootState) => {
    if (rootState.games.items.length <= 0) return [];
    return state.items.map(({ id, quantity }) => {
      const product = rootState.games.items.find(gmae => gmae.Game_No === id);
      return {
        id: product.Game_No,
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
  },
  GetItemSubTotal: () => item => {
    return item.price * item.quantity;
  }
};

export default { namespaced: true, state, actions, mutations, getters };
