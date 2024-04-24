<template>
  <div>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Tên đọc giả:</label>
        <input id="name" :value="book.maDocGia.username" type="text" readonly />
      </div>
      <div>
        <label for="price">Tên Sách:</label>
        <input id="price" :value="book.maSach.tenSach" type="text" readonly />
      </div>

      <div>
        <label for="status">Trạng thái lấy sách:</label>
        <select id="status" v-model="book.trangThaiMuon">
          <option :value="true">Đã lấy</option>
          <option :value="false">Chưa lấy</option>
        </select>
      </div>

      <div>
        <label for="status1">Trạng thái mượn sách:</label>
        <select id="status1" v-model="book.tinhTrang">
          <option :value="true">Đã trả</option>
          <option :value="false">Chưa trả</option>
        </select>
      </div>

      <!-- <div>
          <label for="quantity">Số lượng sách:</label>
          <input id="quantity" v-model="book.soQuyen" type="text" required>
          <p v-if="errors.includes('soQuyen')">Số lượng sách không thể thiếu</p>
        </div> -->
      <button type="submit">Cập nhật</button>
    </form>
  </div>
</template>

<script>
import { getBorrowedBookById, editborrowedBook } from "@/services/borrowedbooks.js";

export default {
  data() {
    return {
      book: {},
    };
  },
  methods: {
    async submitForm() {

      const bookId = this.$route.params.id;
      const token = localStorage.getItem("token");
      try {
        await editborrowedBook(this.book, bookId, token);
        alert("Book updated successfully");
      } catch (error) {
        console.error(error);
        alert("Failed to update book");
      }
    },
  },
  async created() {
    const bookId = this.$route.params.id;
    try {
      const book = await getBorrowedBookById(bookId);
      this.book = book;
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
  background-color: #4caf50;
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
