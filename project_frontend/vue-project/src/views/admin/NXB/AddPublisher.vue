<template>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Tên nhà xuất bản:</label>
          <input id="name" v-model="publisher.tenNXB" type="text" required>
          <p v-if="errors.includes('tenNXB')">Tên NXB không thể thiếu</p>
        </div>
        <div>
          <label for="price">Địa chỉ:</label>
          <input id="price" v-model="publisher.diaChi" type="text" required>
          <p v-if="errors.includes('diaChi')">Địa chỉ không thể thiếu</p>
        </div>
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  </template>
  
  
  <script>
  import { addPublisher } from '@/services/publisherService';
  
  export default {
    data() {
      return {
        publisher: {},
        errors: [],
      };
    },
    methods: {
      async submitForm() {
        this.errors = [];
        if (!this.publisher.tenNXB) this.errors.push('tenNXB');
        if (!this.publisher.diaChi) this.errors.push('diaChi');
  
        if (this.errors.length > 0) return;
  
        const token = localStorage.getItem('token');
        try {
          await addPublisher(this.publisher, token);
          alert('Book added successfully');
        } catch (error) {
          console.error(error);
          alert('Failed to add book');
        }
      },
    },
    async created() {
    //   try {
    //     this.publishers = await getAllPublishers();
    //   } catch (error) {
    //     console.error(error);
    //   }
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
  </style>@/services/NXB