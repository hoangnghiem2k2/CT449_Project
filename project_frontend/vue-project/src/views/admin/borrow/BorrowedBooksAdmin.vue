<template>
  <div>
    <h1>Quản lý mượn sách</h1>
    <router-link :to="{ name: 'addBorrowedBook' }" class="btn btn-add"
      >Thêm thông tin mượn sách mới</router-link
    >
    <table class="table">
      <thead>
        <tr>
          <th>Người mượn</th>
          <th>Tên sách</th>
          <th>Ngày mượn</th>
          <th>Hạn Trả sách</th>
          <th>Trạng thái lấy sách</th>
          <th>Trạng thái trả</th>
          <th>Quản lý</th>
          <!-- Add more columns as needed -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.maDocGia.email }}</td>
          <td>{{   book.maSach.tenSach   }}</td>
          <td>{{ formatDate(book.ngayMuon) }}</td>
          <td>{{ formatDate(book.ngayTra) }}</td>
          <td :class="book.trangThaiMuon ? 'green' : 'red'">
            {{ book.trangThaiMuon ? "Đã lấy sách" : "Chưa lấy sách" }}
          </td>
          <td :class="book.tinhTrang ? 'green' : 'red'">
            {{ book.tinhTrang ? "Đã trả" : "Chưa trả" }}
          </td>
          <td>
            <router-link
              :to="'/admin/editborrowedbooks/' + book._id"
              class="btn btn-edit"
              >Sửa</router-link
            >
            <button class="btn btn-delete" @click="deleteborrowedBook(book)">
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  getAllBorrowedBooks,
  getUnreturnedBooks,
  deleteborrowedBook as apiDelete,
} from "@/services/borrowedbooks.js";
import { format } from "date-fns";
export default {
  data() {
    return {
      books: [],
    };
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), "dd/MM/yyyy");
    },
    async deleteborrowedBook(book) {
      if (window.confirm("Bạn có chắc chắn muốn xóa quyển sách này không?")) {
        try {
          const token = localStorage.getItem("token"); // Replace with your token
          await apiDelete(book._id, token);
          this.books = this.books.filter((p) => p._id !== book._id);
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
  async created() {
    try {
      const borrowedBooks = await getAllBorrowedBooks();
      this.books = borrowedBooks;
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

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #f8f9fa;
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
  background-color: #0082cc;
  color: white;
  margin-bottom: 1em;
  font-size: 18px;
  padding: 10px 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.btn-add:hover {
  background-color: #005999;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}
.btn-edit {
  background-color: #4caf50;
  color: white;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}
.green {
  color: green;
}

.red {
  color: red;
}
</style>
