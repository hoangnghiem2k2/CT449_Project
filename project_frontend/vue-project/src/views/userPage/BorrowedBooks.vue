<template>
  <div>
    <h1>Thông tin mượn sách</h1>
    <div v-if="books && books.length > 0">
      <table class="books-table">
        <thead>
          <tr>
            <th>Tên sách</th>
            <th>Ngày mượn sách</th>
            <th>Hạn trả sách</th>
            <th>Tình trạng</th>
            <th>Trạng thái lấy sách</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in sortedBooks" :key="book._id">
            <td>{{ book.maSach.tenSach }}</td>
            <td>{{ formatDate(book.ngayMuon) }}</td>
            <td>{{ formatDate(book.ngayTra) }}</td>
            <td
              :class="{
                'red-text': !book.tinhTrang,
                'green-text': book.tinhTrang,
              }"
            >
              {{ book.tinhTrang ? "Đã trả" : "Chưa trả" }}
            </td>
            <td
              :class="{
                'red-text': !book.trangThaiMuon,
                'green-text': book.trangThaiMuon,
              }"
            >
              {{ book.trangThaiMuon ? "Đã lấy sách" : "Chưa lấy sách" }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>Hiện tại không có sách nào đang mượn</div>
  </div>
</template>

<script>
import { getBorrowedBooks } from "@/services/borrowedbooks.js";
import { format } from 'date-fns';
export default {
  data() {
    return {
      books: null,
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy");
    },
  },
  async created() {
    const id = this.$route.params.id;
    try {
      this.books = await getBorrowedBooks(id);
      console.log(this.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  },
  computed: {
    sortedBooks() {
      if (this.books) {
        return this.books.slice().sort((a, b) => {
          return a.tinhTrang === b.tinhTrang ? 0 : a.tinhTrang ? 1 : -1;
        });
      } else {
        return [];
      }
    },
  },
};
</script>

<style scoped>
h1 {
  margin-bottom: 50px;
}
.books-table {
  width: 100%;
  border-collapse: collapse;
}
.books-table th,
.books-table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.books-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #f8f9fa;
  color: black;
}
.red-text {
  color: red;
}
.green-text {
  color: green;
}
</style>
