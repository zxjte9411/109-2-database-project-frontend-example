import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login";
import games from "./modules/games";
import shoppingCart from "./modules/shoppingCart";
import wallet from "./modules/walletProfit";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { login, games, shoppingCart, wallet }
});
