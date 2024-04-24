<template>
  <div class="profile">
    <h1 class="profile__title">Thông tin cá nhân</h1>
    <div class="profile__item">
      <label class="profile__label">Email:</label>
      <p class="profile__info">{{ user.email }}</p>
    </div>
    <div class="profile__item">
      <label class="profile__label">Tên:</label>
      <p class="profile__info">{{ user.name }}</p>
    </div>
    <div class="profile__item">
      <label class="profile__label">Số điện thoại:</label>
      <p class="profile__info">{{ user.phone }}</p>
    </div>
    <div class="profile__item">
      <label class="profile__label">Địa chỉ:</label>
      <p class="profile__info">{{ user.address }}</p>
    </div>
    <div class="profile__item">
      <label class="profile__label">Địa chỉ:</label>
      <p class="profile__info">{{ user.address }}</p>
    </div>
    <router-link :to="{ name: 'books' }" class="profile__button" @click="logout">Đăng xuất</router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      user: {} // Khởi tạo user với giá trị mặc định là một đối tượng trống
    };
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  created() {
    this.user = this.getUser; // Gán giá trị từ getUser vào user khi component được tạo ra
},
  methods: {
    ...mapActions(['logout'])
  }
}
</script>


<style scoped>
.profile {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9; /* Add a light background color */
  border-radius: 10px; /* Add border radius */
}

.profile__title {
  text-align: center;
  color: #333;
  font-size: 24px; /* Increase font size */
  margin-bottom: 20px; /* Add margin bottom */
}

.profile__item {
  margin-bottom: 20px;
  display: flex; /* Use flexbox for layout */
  justify-content: space-between; /* Space out label and info */
}

.profile__label {
  font-weight: bold;
  color: #333;
  margin-bottom: 5px; /* Reduce margin bottom */
}

.profile__info {
  color: #666;
  margin-top: 0; /* Remove margin top */
}

.profile__button {
  display: block;
  width: 30%;
  margin: 20px auto 0; /* Add top margin */
  padding: 10px;
  background-color: red;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration-line: none;
  transition: background-color 0.3s ease;
  text-align: center;
}

.profile__button:hover {
  background-color: darkred;
}
</style>
