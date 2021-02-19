import { Login } from "@/api/login.js";
const state = {
  user: {
    role: "",
    email: "",
    cookies: ""
  }
};
const actions = {
  setRole({ commit }, role) {
    commit("setRole", role);
  },
  setEmail({ commit }, email) {
    commit("setEmail", email);
  },
  setCookies({ commit }, cookies) {
    commit("setCookies", cookies);
  },
  async login({ commit }, [email, pwd]) {
    const result = await handleLoginResponse(commit, Login(email, pwd));
    return new Promise((resolve, reject) => {
      if (result) {
        commit("setEmail", email);
        resolve();
      } else {
        reject("email or password error");
      }
    });
  }
};
const mutations = {
  setRole(state, role) {
    state.role = role;
  },
  setEmail(state, email) {
    state.email = email;
  },
  setCookies(state, cookies) {
    state.phpssid = cookies;
  }
};
const getters = {
  Role: state => state.role,
  Email: state => state.email,
  Phpssid: state => state.cookies
};

const handleLoginResponse = async (commit, res) => {
  res = await res;
  let allCookies = document.cookie;
  console.log(allCookies);
  const data = res.data;
  if (data.msg !== "success") return false;
  commit("setRole", data.userrole);
  commit("setCookies", data.allCookies);
  return true;
};

export default { state, actions, mutations, getters };
