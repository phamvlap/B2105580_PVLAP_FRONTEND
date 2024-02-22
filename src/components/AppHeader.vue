<script setup>
const props = defineProps({
    user: {
        type: Object,
    },
});
const $emit = defineEmits(['logoutUser']);
</script>

<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">Ứng dụng Quản lý danh bạ</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav w-100 align-items-center">
                    <li class="nav-item me-auto">
                        <RouterLink :to="{ name: 'contactbook' }" class="nav-link">Danh bạ &nbsp;<i class="fas fa-address-book"></i></RouterLink>
                    </li>
                    <li v-if="!user" class="nav-item">
                        <RouterLink :to="{ name: 'user.register' }" class="nav-link">Đăng ký</RouterLink>
                    </li>
                    <li v-if="!user" class="nav-item">
                        <RouterLink :to="{ name: 'user.login' }" class="nav-link">Đăng nhập</RouterLink>
                    </li>
                    <li v-if="user" class="nav-item">
                        <h4 class="text-secondary my-0 mx-2">
                            <i class="fas fa-user-circle"></i>
                            {{ user.name }}
                        </h4>
                    </li>
                    <li v-if="user" class="nav-item">
                        <a href="#" class="text-secondary m-0 nav-link" @click.prevent="$emit('logoutUser')">Đăng xuất</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>