<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppHeader from './components/AppHeader.vue';

const $router = useRouter();
let user = ref({});
let timer = '';

const logoutUser = () => {
    user.value = null;
    localStorage.removeItem('userData');
    clearTimeout(timer);
    $router.push({
        name: 'user.login',
    });
}
const updateActiveUser = (payload) => {
    user.value = { ...payload };
    timer = setTimeout(() => {
        user.value = null;
        localStorage.removeItem('userData');
        $router.push({
            name: 'user.login',
        });
    }, Number(user.value.expiresIn) * 1000);
}

onMounted(() => {
    const data = JSON.parse(localStorage.getItem('userData'));
    user.value = null;
    if(data != null) {
        const { name, email } = data;
        user.value = { name, email, };
    }
});
</script>

<template>
    <div>
        <AppHeader :user="user" @logoutUser="logoutUser" />
        <div class="container mt-3">
            <RouterView @dispatchUser="updateActiveUser" />
        </div>
    </div>
</template>

<style scoped>
.page {
    max-width: 400px;
    margin: auto;
}
</style>
