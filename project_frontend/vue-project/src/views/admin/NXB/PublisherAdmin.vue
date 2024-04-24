<template>
    <div>
      <h1>Quản lý nhà xuất bản</h1>
      <router-link :to="{ name: 'addPublisher' }" class="btn btn-add">Thêm nhà xuất bản mới</router-link>
      <table class="table">
        <thead>
          <tr>
            <th>Tên nhà xuất bản</th>
            <th>Địa chỉ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="publisher in publishers" :key="publisher.id">
            <td>{{ publisher.tenNXB }}</td>
            <td>{{ publisher.diaChi }}</td>

            <td>
                <router-link :to="'/admin/editpublisher/' + publisher._id" class="btn btn-edit">Sửa</router-link>
                <button class="btn btn-delete" @click="deletePublisher(publisher)">Xóa</button>
            </td> 
          </tr>
        </tbody>
      </table>
    </div>
  </template>
    
  <script>
  import { getAllPublishers, deletePublisher as apiDeletePublisher} from '@/services/publisherService';
  
  export default {
    data() {
      return {
        publishers: [],
      };
    },
    methods: {
      async deletePublisher(publisher) {
        if (window.confirm('Bạn có chắc chắn muốn xóa nhà xuất bản này không?')) {
          try {
            const token = localStorage.getItem('token'); 
            await apiDeletePublisher(publisher._id, token);
            this.publishers = this.publishers.filter(p => p._id !== publisher._id);
          } catch (error) {
            console.error(error);
          }
        }
      },
    },
    async created() {
      try {
      const publishers = await getAllPublishers();
      this.publishers = publishers;
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
    </style>@/services/NXB