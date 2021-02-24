import { Login } from "@/api/login.js";
const getDefaultState = () => {
  return localStorage.getItem("user")
    ? { user: JSON.parse(localStorage.getItem("user")) }
    : {
        user: {
          role: "",
          email: "",
          cookies: "",
          isLogin: false
        }
      };
};
const state = getDefaultState();
const actions = {
  resetCartState({ commit }) {
    commit("resetCartState");
  },
  setRole({ commit }, role) {
    commit("setRole", role);
  },
  setEmail({ commit }, email) {
    commit("setEmail", email);
  },
  setCookies({ commit }, cookies) {
    commit("setCookies", cookies);
  },
  setIsLogin({ commit }) {
    commit("setIsLogin");
  },
  async login({ commit }, [email, pwd]) {
    const result = await handleLoginResponse(commit, Login(email, pwd));
    return new Promise((resolve, reject) => {
      if (result) {
        commit("setEmail", email);
        commit("setIsLogin", true);
        localStorage.setItem("user", JSON.stringify(state.user));
        resolve();
      } else {
        commit("resetCartState");
        reject("email or password error");
      }
    });
  },
  logout({ commit }) {
    localStorage.removeItem("user");
    commit("resetCartState");
  }
};
const mutations = {
  resetCartState(state) {
    Object.assign(state, getDefaultState());
  },
  setRole(state, role) {
    state.user.role = role;
  },
  setEmail(state, email) {
    state.user.email = email;
  },
  setCookies(state, cookies) {
    state.user.cookies = cookies;
  },
  setIsLogin(state, isLogin) {
    state.user.isLogin = isLogin;
  }
};
const getters = {
  Role: state => state.user.role,
  Email: state => state.user.email,
  Phpssid: state => state.user.cookies,
  IsLogin: state => state.user.isLogin
};

const handleLoginResponse = async (commit, res) => {
  res = await res;
  let allCookies = document.cookie;
  const data = res.data;
  if (data.msg !== "success") return false;
  commit("setRole", data.userrole);
  commit("setCookies", allCookies);
  return true;
};

export default { namespced: true, state, actions, mutations, getters };