import { GetCoupon } from "@/api/shoopingCart";

const getDefaultState = () => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { items: [], coupons: [] };
  return {
    // item: [{ id, quantity }]
    items: cart.items,
    coupons: cart.coupons,
    checkoutStatus: null
  };
};

const state = getDefaultState();

const actions = {
  resetCartState({ commit }) {
    commit("resetCartState");
  },
  addProductToCart({ state, commit }, game) {
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
  },
  async GetCoupon({ commit }) {
    const coupones = (await GetCoupon()).data.data;
    commit("SetCoupons", coupones);
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
    localStorage.setItem("cart", JSON.stringify(state));
  },
  incrementItemQuantity(state, { id }) {
    const cartItem = state.items.find(item => item.id === id);
    cartItem.quantity++;
    localStorage.setItem("cart", JSON.stringify(state));
  },
  decrementItemQuantity(state, { id }) {
    const cartItem = state.items.find(item => item.id === id);
    cartItem.quantity--;
    localStorage.setItem("cart", JSON.stringify(state));
  },
  remoItemFromShoopingCart(state, { id }) {
    const cartItem = state.items.find(item => item.id === id);
    state.items.splice(state.items.indexOf(cartItem), 1);
    localStorage.setItem("cart", JSON.stringify(state));
  },
  SetCoupons(state, coupons) {
    state.coupons = coupons;
    localStorage.setItem("cart", JSON.stringify(state));
  }
};

const getters = {
  CartItems: (state, getters, rootState) => {
    if (rootState.games.items.length <= 0) return [];
    return state.items.map(({ id, quantity }) => {
      const product = rootState.games.items.find(game => game.Game_No === id);
      if (product)
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
    if (getters.CartItems.length === 0) return 0;
    return getters.CartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  },
  GetItemSubTotal: () => item => {
    return item.price * item.quantity;
  },
  CartItemLength: state => {
    return state.items.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
  },
  Coupons: state => state.coupons
};

export default { namespaced: true, state, actions, mutations, getters };
