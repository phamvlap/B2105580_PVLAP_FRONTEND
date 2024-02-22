<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UserService from './../services/user.service';

const $router = useRouter();
const $emit = defineEmits(['dispatchUser']);

let name = ref('');
let email = ref('');
let password = ref('');
let showError = ref(false);

const onSubmit = async () => {
    if(password.value.length < 6) {
        alert('Mật khẩu tối thiểu 6 ký tự!!');
        return;
    }
    const userService = new UserService();
    try {
        const data = await userService.register({
            name: name.value,
            email: email.value,
            password: password.value,
        });
        const user = data.data.user;
        name.value = '';
        email.value = '';
        password.value = '';
        $router.push('/login');
        window.registeringUser = user;
    }
    catch(error) {
        showError.value = true;
        setTimeout(() => {
            showError.value = false;
        }, 2000);
    }
}
</script>

<template>
    <div class="row">
        <div class="offset-lg-3 col-lg-6 offset-1 col-10">
            <h2 class="text-center">Đăng ký tài khoản</h2>
            <p class="text-center text-danger" v-if="showError">
                <i>Xảy ra lỗi trong quá trình tạo tài khoản. Vui lòng thử lại</i>
            </p>
            <form @submit.prevent="onSubmit">
                <div class="mb-3">
                    <label for="name" class="form-label">Tên:</label>
                    <input type="text" class="form-control" id="name" required v-model="name">
                </div>
                <div class="mb-3">
                    <label for="email" class="form-label">Email:</label>
                    <input type="email" class="form-control" id="email" required v-model="email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Mật khẩu:</label>
                    <input type="password" class="form-control" id="password" required v-model="password">
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-secondary">Đăng ký</button>
                </div>
            </form>
        </div>
    </div>
</template>