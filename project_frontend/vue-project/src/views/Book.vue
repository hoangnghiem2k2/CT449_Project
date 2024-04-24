<template>
  <div class="container" v-if="book">
    <div class="book card">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img class="book__image card-img" :src="book.img" alt="Book cover" />
        </div>
        <div class="col-md-8">
          <div class="book__info card-body">
            <h2 class="book__title card-title">{{ book.tenSach }}</h2>
            <p class="book__author card-text">Tác giả: {{ book.tacGia }}</p>
            <p class="book__author card-text">Tiền phạt trả sách muộn: {{ book.dongia }} đ / ngày</p>
            <p class="book__author card-text">Thể loại: {{ book.loaiSach }}</p>

            <p class="book__quantity card-text">Số lượng: {{ quantity.count }}</p>
            <p class="book__author card-text">Thời hạn mượn sách: 30 ngày</p>

            <button class="book__button btn btn-primary" @click="borrowBook" v-if="quantity.count > 0 && !errorMessage">Mượn Sách</button>
            <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>
            <p class="out-of-stock" v-else-if="quantity.count === 0 && !errorMessage">Đã Hết</p>
          </div>
        </div>
      </div>
    </div>    
  </div>
</template>

<script>
import { getBookById, getRemainQuantity } from '@/services/bookService.js';
import {borrowBook} from '@/services/borrowedbooks.js';
import { mapGetters } from 'vuex';

export default {
data() {
  return {
    book: {},
    quantity: 0,
    errorMessage: '' // New data property for error message
  }
},
computed: {
  ...mapGetters(['getUser']) // Get user from Vuex
},
created() {
  const bookId = this.$route.params.id;
  getBookById(bookId)
    .then(response => {
      const bookData = response;
      this.book = bookData;
    })
    .catch(error => {
      console.error(error);
    });

    getRemainQuantity(bookId)
    .then(response => {
      this.quantity = response;
    })
    .catch(error => {
      console.error(error);
    });
},
methods: {
  borrowBook() {
  const token = localStorage.getItem('token');
  const data = {
    maDocGia: this.getUser?._id,
    maSach: this.book?._id
  };
  if (!token) {
    this.$router.push('/login');
    return;
  }

  borrowBook(data, token)
    .then(response => {
      console.log(response);
      // Clear error message on successful response
      alert('Book added successfully');
      this.errorMessage = '';

      // Update the remaining quantity
      getRemainQuantity(this.book._id)
        .then(response => {
          this.quantity = response;
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
      // Set error message on error
      this.errorMessage = 'Không được phép mượn thêm khi chưa trả sách';
    });
}}
}
</script>

<style scoped>
.container {
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background-color: #f8f9fa;
}

.book.card {
max-width: 1000px; /* Increase the max-width of the card */
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.book__image.card-img {
object-fit: cover;
width: 100%;
height: 500px; /* Increase the height of the image */
}

.book__info.card-body {
  padding: 20px;
}

.book__title.card-title {
font-size: 30px; /* Increase the font size of the title */
margin-bottom: 20px; /* Increase the margin-bottom of the title */
}

.book__author.card-text,
.book__quantity.card-text {
font-size: 22px; /* Increase the font size of the author and quantity */
margin-bottom: 20px; /* Increase the margin-bottom of the author and quantity */
}

.book__button.btn {
font-size: 20px; /* Increase the font size of the button */
}

.row.no-gutters {
display: flex;
align-items: center;
}
.out-of-stock {
font-size: 30px; /* Increase the font size */
color: red; /* Change the color to red */
}

.error-message {
color: red;
font-size: 20px;
}
</style>