<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UserService from './../services/user.service';

const $router = useRouter();
const $emit = defineEmits(['dispatchUser']);
let email = ref(window.registeringUser ? window.registeringUser.email : '');
let password = ref('');
let showError = ref(false);

const onSubmit = async () => {
    const userService = new UserService();
    try {
        const data = await userService.login({
            email: email.value,
            password: password.value,
        });
        const user = data.data;
        email.value = '';
        password.value = '';
        localStorage.setItem('userData', JSON.stringify(user));      
        $emit('dispatchUser', user);
        $router.push({
            name: 'contactbook',
        });
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
            <h2 class="text-center">Đăng nhập</h2>
            <p class="text-center text-danger" v-if="showError">
                <i>Email hoặc mật khẩu không đúng. Vui lòng thử lại</i>
            </p>
            <form @submit.prevent="onSubmit">
                <div class="mb-3">
                    <label for="email" class="form-label">Email:</label>
                    <input type="email" class="form-control" id="email" v-model="email">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Mật khẩu:</label>
                    <input type="password" class="form-control" id="password" v-model="password">
                </div>
                <div class="text-center">
                    <button type="submit" class="btn btn-secondary">Đăng nhập</button>
                </div>
            </form>
        </div>
    </div>
</template>