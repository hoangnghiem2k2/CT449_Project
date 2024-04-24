<template>
  <div>
    <h1>Quản lý người dùng</h1>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Tên</th>
          <th>Số điện thoại</th>
          <th>Địa chỉ</th>
          <th>Nhóm người dùng</th>
          <th>Quản lý</th>
          <!-- Add more columns as needed -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user._id }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.isAdmin ? 'Quản trị viên' : 'Độc giả' }}</td>
          <td>
              <router-link :to="'/admin/edituser/' + user._id" class="btn btn-edit">Sửa</router-link>
              <button class="btn btn-delete" @click="deleteUser(user)">Xóa</button>
          </td>
          <!-- Add more cells as needed -->
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script>
import { getAllUsers, deleteUser as apiDeleteUser } from '@/services/userService';

export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    editUser(user) {
      // Handle the edit user action here
    },
    async deleteUser(user) {
      if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này không?')) {
        try {
          const token = localStorage.getItem('token'); // Replace with your token
          await apiDeleteUser(user._id, token);
          this.users = this.users.filter(u => u._id !== user._id);
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
  async created() {
    try {
      const token = localStorage.getItem('token'); // Replace with your token
      this.users = await getAllUsers(token);
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

  
  <style scoped>
  .table {
    width: 100%;
    margin-top: 1em;
    border-collapse: collapse;
  }
  
  .table th, .table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  .table th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #F8F9FA;
    color: black;
  }
  .btn {
    padding: 5px 10px;
    margin: 5px;  
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-size: 14px;
  }

  .btn-add {
    background-color: #0082CC;  
    color: white;
    margin-bottom: 1em;
    font-size: 18px;  
    padding: 10px 20px;  
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);  
    transition: all 0.3s ease;  
  }

  .btn-add:hover {
    background-color: #005999;  
    box-shadow: 0 5px 15px rgba(0,0,0,0.3); 
  }
  .btn-edit {
    background-color: #4CAF50;
    color: white;
  }

  .btn-delete {
    background-color: #f44336;
    color: white;
  }
  </style>