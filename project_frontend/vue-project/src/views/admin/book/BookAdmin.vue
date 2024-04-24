<template>
    <div>
      <h1>Quản lý kho sách</h1>
      <router-link :to="{ name: 'addBook' }" class="btn btn-add">Thêm sách mới</router-link>
      <table class="table">
        <thead>
          <tr>
            <th>Tên sách</th>
            <th>Đơn giá</th>
            <th>Số quyển</th>
            <th>Nhà xuất bản</th>
            <th>Năm xuất bản</th>
            <th>Tác giả</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.tenSach }}</td>
            <td>{{ book.dongia }}</td>
            <td>{{ book.soQuyen }}</td>
            <td>{{ book.tenNXB }}</td>
            <td>{{ book.namXuatBan }}</td>
              <td>{{ book.tacGia }}</td>

            <td>
                <router-link :to="'/admin/editbook/' + book._id" class="btn btn-edit">Sửa</router-link>
                <button class="btn btn-delete" @click="deleteBook(book)">Xóa</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
    
  <script>
  import { getAllBooks, deleteBook as apiDeleteBook } from '@/services/bookService';
  import { getPublisherById } from '@/services/publisherService';
  
  export default {
    data() {
      return {
        books: [],
      };
    },
    methods: {
   
        async getPublisherName(maNXB) {
          try {
            const publisher = await getPublisherById(maNXB);
            return publisher.tenNXB;
          } catch (error) {
            console.error(error);
            return '';
          }
        },
      async deleteBook(book) {
        if (window.confirm('Bạn có chắc chắn muốn xóa quyển sách này không?')) {
          try {
            const token = localStorage.getItem('token'); // Replace with your token
            await apiDeleteBook(book._id, token);
            this.books = this.books.filter(b => b._id !== book._id);
          } catch (error) {
            console.error(error);
          }
        }
      },
    },
    async created() {
      try {
      const books = await getAllBooks();
      for (let book of books) {
        book.tenNXB = await this.getPublisherName(book.maNXB);
      }
      this.books = books;
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