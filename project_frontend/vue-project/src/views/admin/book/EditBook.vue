<template>
    <div>
      <form @submit.prevent="submitForm">
        <div>
          <label for="name">Tên sách:</label>
          <input id="name" v-model="book.tenSach" type="text" required>
          <p v-if="errors.includes('tenSach')">Tên sách không thể thiếu</p>
        </div>
        <div>
          <label for="price">Đơn giá:</label>
          <input id="price" v-model="book.dongia" type="text" required>
          <p v-if="errors.includes('donGia')">Đơn giá không thể thiếu</p>
        </div>
        <div>
          <label for="quantity">Số lượng sách:</label>
          <input id="quantity" v-model="book.soQuyen" type="text" required>
          <p v-if="errors.includes('soQuyen')">Số lượng sách không thể thiếu</p>
        </div>
        <div>
          <label for="publisher">Năm xuất bản:</label>
          <input id="publisher" v-model="book.namXuatBan" type="text" required>
          <p v-if="errors.includes('namXuatBan')">Năm xuất bản không thể thiếu</p>
        </div>
        <div>
          <label for="publisher">Nhà xuất bản:</label>
          <select id="publisher" v-model="book.maNXB">
          <option v-for="publisher in publishers" :value="publisher._id" :key="publisher._id">
            {{ publisher.tenNXB }}
          </option>
        </select>
        </div>
        
        <div>
          <label for="author">Tác giả:</label>
          <input id="author" v-model="book.tacGia" type="text" required>
          <p v-if="errors.includes('tacGia')">Tác giả không thể thiếu</p>
        </div>
        <div>
          <label for="image">Hình ảnh:</label>
          <input id="image" v-model="book.img" type="text" required>
          <p v-if="errors.includes('img')">Hình ảnh không thể thiếu</p>
        </div>
        <button type="submit">Cập nhật</button>
      </form>
    </div>
  </template>
  
  <script>
  import { getBookById, editBook } from '@/services/bookService';
  import { getAllPublishers } from '@/services/publisherService';
  
  export default {
    data() {
      return {
        book: {},
        publishers: [],
        errors: [],
      };
    },
    methods: {
      async submitForm() {
        this.errors = [];
        if (!this.book.tenSach) this.errors.push('tenSach');
        if (!this.book.donGia) this.errors.push('donGia');
        if (!this.book.soQuyen) this.errors.push('soQuyen');
        if (!this.book.namXuatBan) this.errors.push('namXuatBan');
        if (!this.book.maNXB) this.errors.push('maNXB');
        if (!this.book.tacGia) this.errors.push('tacGia');
        if (!this.book.img) this.errors.push('img');
  
  
        const bookId = this.$route.params.id;
        const token = localStorage.getItem('token');
        try {
          await editBook(this.book, bookId, token);
          alert('Book updated successfully');
        } catch (error) {
          console.error(error);
          alert('Failed to update book');
        }
      },
    },
    async created() {
      const bookId = this.$route.params.id;
      try {
        const book = await getBookById(bookId);
        this.book = book;
        this.publishers = await getAllPublishers();
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