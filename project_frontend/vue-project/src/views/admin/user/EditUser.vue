<template>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="username">Email:</label>
          <input id="username" v-model="user.email" type="text" >
        </div>
        <div>
          <label for="name">Tên:</label>
          <input id="name" v-model="user.name" type="text" >
        </div>
        <div>
          <label for="phone">Số điện thoại:</label>
          <input id="phone" v-model="user.phone" type="text" >
        </div>
        <div>
          <label for="address">Địa chỉ:</label>
          <input id="address" v-model="user.address" type="text" required>
        </div>
        <div>
            <label for="role">Chức vụ:</label>
            <select id="role" v-model="user.role">
                <option value="User">User</option>
                <option value="Admin">Admin</option>
            </select>
        </div>
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  </template>
  
  <script>
  import { getUserById, editUser } from '@/services/userService';
  
  export default {
    data() {
      return {
        user: {},
      };
    },
    methods: {
      async submitForm() {
    const userId = this.$route.params.id;
    const token = localStorage.getItem('token');
    const { password, ...userWithoutPassword } = this.user;
    try {
      await editUser(userWithoutPassword, userId, token);
      alert('User updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update user');
    }
  },
    },
    async created() {
      const userId = this.$route.params.id; // Replace 'id' with the actual parameter name in your route
      try {
        const user = await getUserById(userId);
        this.user = user;
        this.user.role = this.user.isAdmin ? 'Admin' : 'User';
      } catch (error) {
        console.error(error);
      }
    },
  };
  </script>

<style scoped>
form {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 15px;
  background-color: #f7f7f7;
  border-radius: 8px;
}

form div {
  margin-bottom: 10px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

form button {
  padding: 10px 20px;
  border: none;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

form button:hover {
  background-color: #45a049;
}
form select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
</style>