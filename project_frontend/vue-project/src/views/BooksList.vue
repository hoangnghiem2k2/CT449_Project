<template>
    <form class="d-flex justify-content-center" role="search" @submit.prevent="searchBooks">
    <input class="form-control me-2" type="search" v-model="searchTerm" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success" type="submit">Search</button>
  </form>
    <div class="books-container">
      <div v-if="loading">Loading...</div>
      <div v-else class="books-grid">
        <router-link v-for="book in books" :key="book._id" :to="'/book/' + book._id" class="book">
          <img :src="book.img" alt="Book Image" class="book-image" />       
          <p class="book-name">{{ book.tenSach }}</p>
        </router-link>
      </div>
    </div>
  </template>
  
  <script>
import { reactive, onMounted, toRefs } from 'vue';
import { getAllBooks } from '@/services/bookService';

export default {
  setup() {
    const state = reactive({
      books: [],
      loading: true,
      searchTerm: ''
    });

    const fetchBooks = async () => {
      try {
        state.books = await getAllBooks();
      } catch (error) {
        console.error('Đã xảy ra lỗi khi lấy danh sách sách:', error.message);
      } finally {
        state.loading = false;
      }
    };
    const normalizeString = (str) => {
  const accents = [
    /[\300-\306]/g, /[\340-\346]/g, // A, a
    /[\310-\313]/g, /[\350-\353]/g, // E, e
    /[\314-\317]/g, /[\354-\357]/g, // I, i
    /[\322-\330]/g, /[\362-\370]/g, // O, o
    /[\331-\334]/g, /[\371-\374]/g, // U, u
    /[\321]/g, /[\361]/g, // N, n
    /[\307]/g, /[\347]/g, // C, c
    /[\320]/g, /[\360]/g, // D, d
    /[\272]/g, /[\273]/g, // K, k
    /[\254]/g, /[\255]/g, // Y, y
    /[\256]/g, /[\257]/g, // M, m
    /[\260]/g, /[\261]/g, // T, t
    /[\262]/g, /[\263]/g, // D, d
    /[\264]/g, /[\265]/g, // 4, 0
  ];
  const noAccents = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c', 'D', 'd', 'K', 'k', 'Y', 'y', 'M', 'm', 'T', 't', 'D', 'd', '4', '0'];

  for (let i = 0; i < accents.length; i++) {
    str = str.replace(accents[i], noAccents[i]);
  }

  // Remove special characters and replace multiple spaces with a single space
  str = str.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, ' ');

  return str.toLowerCase();
};
const searchBooks = async () => {
  const normalizedSearchTerm = normalizeString(state.searchTerm);

  try {
    const allBooks = await getAllBooks();
    state.books = allBooks.filter(book => {
      const normalizedBookName = normalizeString(book.tenSach);
      return normalizedBookName.includes(normalizedSearchTerm);
    });
  } catch (error) {
    console.error('Error fetching books:', error.message);
  }
};

    onMounted(() => {
      fetchBooks();
    });

    return {
      ...toRefs(state),
      searchBooks
    };
  }
};
</script>

  
<style scoped>
  .books-grid{
    padding: 20px;
    display: grid;
    flex-wrap: wrap;
    width: 100%;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .book {
    display: flex;
    flex-direction: column;
    border: 2px solid #ccc;
    text-decoration: none;
  }

  .book-image {
    /* height: 75%; */
    padding-top: 8px;
    width: 100%;
    z-index: 2;
  }
  .book-name{
    display: flex;
    justify-content: center;
    font-size: 16px;
    color: rgb(37, 35, 35);
    cursor: pointer;
    padding-left: 36px;
    padding-right: 36px;
    padding-top: 8px;
  }

  .book-name::hover{
    text-decoration: underline
  } 
  .book-details {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
  }

  .form-control{
    width: 30%;
  }
</style>
