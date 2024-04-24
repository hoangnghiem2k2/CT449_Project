<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img src="../../public/logo.png" alt="">
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent ">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 justify-content-center">
          
          <li class="nav-item">
            <router-link v-if="getUser && getUser.isAdmin" :to="{ name: 'userAdmin' }" class="nav-link active" aria-current="page">Nguời dùng</router-link>
            <router-link v-else :to="{ name: 'books' }" class="nav-link">Sách</router-link>
          </li>
          <li>
            <router-link v-if="getUser && !getUser.isAdmin" :to="{ name: 'profile' }" class="nav-link">Thông tin cá nhân</router-link>
            <router-link v-if="getUser && getUser.isAdmin" :to="{ name: 'bookAdmin' }" class="nav-link">Sách</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="getUser && !getUser.isAdmin" :to="'/borrowedbooks/' + getUser._id" class="nav-link">Thông tin mượn sách</router-link>
            <router-link v-if="getUser && getUser.isAdmin" :to="{ name: 'publisherAdmin' }" class="nav-link">Quản lý Nhà xuất bản</router-link>
          </li>
          <li class="nav-item">
            <!-- <router-link v-if="getUser && !getUser.isAdmin" :to="'/borrowedbooks/' + getUser._id" class="nav-link">Theo dõi mượn sách</router-link> -->
            <router-link v-if="getUser && getUser.isAdmin" :to="{ name: 'borrowedBooksAdmin' }" class="nav-link">Thẻ mượn sách</router-link>
          </li>
          <li class="nav-item">
            <p v-if="getUser && !getUser.isAdmin"  class="nav-link">Hệ thống: Chào mừng độc giả của The BookTown!!</p>
            <p v-if="getUser && getUser.isAdmin" class="nav-link">Hệ thống: Admin đang quản lý</p>
          </li>
          
        </ul>
        <div class="d-flex justify-content-center">
          <router-link v-if="getUser" :to="{ name: 'books' }" @click="logout" class="btn btn-warning logout-button">Đăng xuất</router-link>
          <router-link v-if="getUser === null" :to="{ name: 'login' }" class="btn btn-warning me-2 ">Đăng nhập</router-link>
          <router-link v-if="getUser === null" :to="{ name: 'register' }" class="btn btn-warning ml-5">Đăng ký</router-link>
        </div>
        
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    ...mapActions(['logout']),
    async setUserFromLocalStorage() {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        await this.$store.commit('SET_USER', user);
      }
    },
  },
  async created() {
    await this.setUserFromLocalStorage();
  },
};
</script>

<style scoped>
.navbar {
  background-color: #4b046eb2;
  padding-left: 32px;
  padding-right: 32px;
}

.nav-link {
  margin-right: 10px; 
  font-weight: bold;
  font-size: large;
  color: #d8d80b; 
  
}

.nav-link:hover {
  color: #000; 
}

.logout-button {
  color: black; 
}
</style>