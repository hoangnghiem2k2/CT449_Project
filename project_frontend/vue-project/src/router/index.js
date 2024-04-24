// /src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Books from '../views/BooksList.vue'
import Profile from '../views/userPage/Profile.vue'
import Book from '../views/Book.vue'
import BorrowedBooks from '../views/userPage/BorrowedBooks.vue'
import UserAdmin from '@/views/admin/user/UserAdmin.vue'
import EditUser from '@/views/admin/user/EditUser.vue'
import BookAdmin from '@/views/admin/book/BookAdmin.vue'
import EditBook from '@/views/admin/book/EditBook.vue'
import AddBook from '@/views/admin/book/AddBook.vue'
import PublisherAdmin from '@/views/admin/NXB/PublisherAdmin.vue'
import EditPublisher from '@/views/admin/NXB/EditPublisher.vue'
import AddPublisher from '@/views/admin/NXB/AddPublisher.vue'
import BorrowedBooksAdmin from '@/views/admin/borrow/BorrowedBooksAdmin.vue'
import EditBorrowedBooks from '@/views/admin/borrow/EditBorrowedBooks.vue'
import AddBorrowedBook from '@/views/admin/borrow/AddBorrowedBook.vue'
 import HomePage from '@/views/HomePage.vue'

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/books',
    name: 'books',
    component: Books
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
  path: '/',
   name: 'HomePage',
    component: HomePage
   },
  {
    path: '/book/:id',
    name: 'book',
    component: Book
  },
  {
    path: '/borrowedbooks/:id',
    name: 'borrowedbooks',
    component: BorrowedBooks
  },
  {
    path: '/admin/users',
    name: 'userAdmin',
    component: UserAdmin
  },
  {
    path: '/admin/edituser/:id',
    name: 'editUser',
    component: EditUser
  },
 
  {
    path: '/admin/books',
    name: 'bookAdmin',
    component: BookAdmin
  },
  {
    path: '/admin/editbook/:id',
    name: 'editBook',
    component: EditBook
  },
  {
    path: '/admin/addbook',
    name: 'addBook',
    component: AddBook
  },
  {
    path: '/admin/publishers',
    name: 'publisherAdmin',
    component: PublisherAdmin
  },
  {
    path: '/admin/editpublisher/:id',
    name: 'editPublisher',
    component: EditPublisher
  },
  {
    path: '/admin/addpublisher',
    name: 'addPublisher',
    component: AddPublisher
  },
  {
    path: '/admin/borrowedbooks',
    name: 'borrowedBooksAdmin',
    component: BorrowedBooksAdmin
  },
  {
    path: '/admin/editborrowedbooks/:id',
    name: 'editBorrowedBooks',
    component: EditBorrowedBooks
  },
  {
    path: '/admin/addborrowedbook',
    name: 'addBorrowedBook',
    component: AddBorrowedBook
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
