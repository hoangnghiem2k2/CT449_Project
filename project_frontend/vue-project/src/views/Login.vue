<template>
  <Form @submit="submitLogin" :validation-schema="loginFormSchema">
    <div class="form-group">
      <label for="email">Email</label>
      <Field name="email" type="text" class="form-control" />
      <ErrorMessage name="email" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="password">Mật khẩu</label>
      <Field name="password" type="password" class="form-control" />
      <ErrorMessage name="password" class="error-feedback" />
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary">Đăng nhập</button>
    </div>
  </Form>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { loginUser } from "@/services/authService";
import { mapActions, mapGetters } from "vuex";

import VuexStore from "../vuex/store";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  store: VuexStore,
  data() {
    return {
      loginFormSchema: yup.object().shape({
        email: yup.string().required("Tên đăng nhập là bắt buộc"),
        password: yup.string().required("Mật khẩu là bắt buộc"),
      }),
    };
  },
  methods: {
    ...mapActions(["setUser"]),
    // ...mapGetters(['getUser']),
    async submitLogin(loginData) {
      try {
        const user = await loginUser(loginData);
        this.setUser(user);
        // console.log('User data:', this.getUser());
        this.$router.push("/books");
      } catch (error) {
        console.error("Đã xảy ra lỗi khi đăng nhập:", error.message);
        // Xử lý lỗi đăng nhập ở đây (hiển thị thông báo lỗi, v.v.)
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/form.css";
</style>
