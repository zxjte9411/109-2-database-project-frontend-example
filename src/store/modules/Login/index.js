import { Login } from "@/api/login.js";
const state = {
  user: {
    role: "",
    email: "",
    phpssid: ""
  }
};
const actions = {
  setRole({ commit }, role) {
    commit("setRole", role);
  },
  setEmail({ commit }, email) {
    commit("setEmail", email);
  },
  setPhpssid({ commit }, ssid) {
    commit("setPhpssid", ssid);
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
  setPhpssid(state, ssid) {
    state.phpssid = ssid;
  }
};
const getters = {
  Role: state => state.role,
  Email: state => state.email,
  Phpssid: state => state.phpssid
};

const handleLoginResponse = async (commit, res) => {
  res = await res;
  const data = res.data;
  if (data.msg !== "success") return false;
  commit("setRole", data.userrole);
  return true;
};

export default { state, actions, mutations, getters };
