import Vue from "vue";
import Vuex from "vuex";
import Login from "./modules/login";
import Items from "./modules/items";
import Cart from "./modules/cart";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { login: Login, items: Items, cart: Cart }
});
