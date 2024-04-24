<template>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="username">Tên Người dùng:</label>
          <select id="username" v-model="borrowedBook.maDocGia">
          <option v-for="user in users" :value="user._id" :key="user._id">
            {{ user.username }}
          </option>
        </select>
        </div>
        <div>
          <label for="username">Tên Sách:</label>
          <select id="username" v-model="borrowedBook.maSach">
          <option v-for="book in books" :value="book._id" :key="book._id">
            {{ book.tenSach }}
          </option>
        </select>
        </div>
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  </template>
  
  
  <script>
  import { getAllUsers } from '@/services/userService';
  import { getAllBooks } from '@/services/bookService';
  import {borrowBook} from '@/services/borrowedbooks.js';
  
  export default {
    data() {
      return {
        books: [],
        users: [],
        borrowedBook: {},
      };
    },
    methods: {
      async submitForm() {
        const token = localStorage.getItem('token');
        try {
          await borrowBook(this.borrowedBook, token);
          alert('Book added successfully');
        } catch (error) {
          console.error(error);
          alert('Failed to add book');
        }
      },
    },
    async created() {
      try {
        const token = localStorage.getItem('token');
        this.books = await getAllBooks();
        this.users = await getAllUsers(token);
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