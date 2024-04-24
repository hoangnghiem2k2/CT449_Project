<template>
    <MDBCarousel
      v-model="carousel3"
      :items="items3"
      :indicators="false"
    />
  </template>

<script>
import { ref } from "vue";
import { MDBCarousel } from "mdb-vue-ui-kit";
export default {
  components: {
    MDBCarousel
  },
  setup() {
    const items3 = [
      {
        src: "https://media.istockphoto.com/id/949118068/photo/books.jpg?s=612x612&w=0&k=20&c=1vbRHaA_aOl9tLIy6P2UANqQ27KQ_gSF-BH0sUjQ730=",
        alt: "..."
      },
      {
        src: "https://media.istockphoto.com/id/1460007178/photo/library-books-on-table-and-background-for-studying-learning-and-research-in-education-school.webp?b=1&s=170667a&w=0&k=20&c=TRED57BZuROoCEP9kR85pW38PLz32onmM8106OoXeGQ=",
        alt: "..."
      },
      {
        src: "https://www.shutterstock.com/image-photo/professor-explaining-student-library-university-260nw-2355774569.jpg",
        alt: "..."
      }
    ];
    const carousel3 = ref(0);
    return {
      items3,
      carousel3
    };
  }
};
</script>