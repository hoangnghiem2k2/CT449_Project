import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null // Thông tin người dùng
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      // Lưu thông tin user vào localStorage khi cập nhật
      localStorage.setItem('user', JSON.stringify(user));
    },
    LOGOUT(state) {
      state.user = null;
      // Xóa thông tin user khỏi localStorage khi đăng xuất
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    logout({ commit }) {
      commit('LOGOUT');
    }
  },
  getters: {
    getUser: state => state.user
  }
});
